import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import * as Tone from 'tone'
import {AlertController} from '@ionic/angular';
import {jqxKnobComponent} from "jqwidgets-ng/jqxknob";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit, OnDestroy{
  @ViewChild('knobReference') myKnob: jqxKnobComponent;
  progressBar: any =
    {
      size: '70%',
      offset: '0%',
      background: {
        stroke: '#373636',
        strokeWidth: 1,
        fill: {color: '#a7a7a7', gradientType: "linear", gradientStops: [[0, 1], [50, 0.5], [100, 1]]}
      }
    };
  pointer: any =
    {
      type: 'circle',
      style: {
        fill: {color: '#a4a3a3', gradientType: "linear", gradientStops: [[0, 0.5], [50, 0.6], [100, 1]]},
        stroke: '#333'
      },
      size: '10%',
      offset: '50%'
    };

  referenceToneSynth: any;
  synth: any;
  sliderValue: number;
  currentNote: any
  randomToneOffset: number
  readonly numberOfExcercises = 15;
  excercise: number;

  /*
  Octave 4
  See https://mixbutton.com/mixing-articles/music-note-to-frequency-chart/
  and https://tonejs.github.io
   */

  notes: object = {
    C: 261.63,
    D: 293.66,
    E: 329.63,
    F: 349.23,
    G: 392.00,
    A: 440.00,
    H: 493.88
  }

  constructor(private alertController: AlertController, private router: Router) {
    this.excercise = 1;
    this.referenceToneSynth = new Tone.Synth().toDestination();
    this.synth = new Tone.Synth({envelope: {
        attack: 0.0005,
        decay: 1.9,
        sustain: 0.8,
        release: 15,
      }}).toDestination();
    this.setup(false);
  }

  ngOnDestroy(): void {
      this.showTabbar();
    }

  ngAfterViewInit() {
    this.hideTabbar();
  }

  playReferenceSound() {
    this.referenceToneSynth.triggerAttackRelease(this.currentNote, "8n");
  }

  playSelectedSound() {
    this.synth.triggerAttackRelease(this.currentNote + this.calculateSelectedDif(), 0.001);
  }

  calculateSelectedDif() {
    return (this.sliderValue + (this.offset * 100) - 50) * 1 + this.randomToneOffset
  }

  async confirmSelection() {
    const diff = this.calculateSelectedDif();
    const diffInCents = calcCents(this.currentNote, this.currentNote + diff);
    const diffInCentsAbs = Math.abs(diffInCents);

    let header = '';
    let subHeader = '';
    switch (true) {
      case (diffInCentsAbs > 100):
        header = 'Katastrophal';
        subHeader = 'Das war ganz schön daneben!';
        break;
      case (diffInCentsAbs > 51):
        header = 'Ungenügend';
        subHeader = 'Das klingt aber wirklich schief!';
        break;
      case (diffInCentsAbs > 25):
        header = 'Ganz in Ordnung';
        subHeader = 'Das klingt schon ganz gut. Übe weiter!';
        break;
      case (diffInCentsAbs > 6):
        header = 'Fast perfekt';
        subHeader = 'Das klingt schon echt gut. Mache weiter so!';
        break;
      default:
        header = 'Perfekt';
        subHeader = 'Du hast den Ton voll getroffen. Du bist echt ein musikalisches Talent!';
        break;
    }

    let message = '';
    if (diffInCents > 0) {
      message = 'Dein ausgewählter Ton ist ' + diffInCentsAbs.toFixed(1) + ' Cents zu hoch. ';
    } else if (diffInCents < 0) {
      message = 'Dein ausgewählter Ton ist ' + diffInCentsAbs.toFixed(1) + ' Cents zu niedrig. ';
    } else {
      message = 'Dein ausgewählter Ton ist genau richtig. ';
    }
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();
    if (this.excercise === this.numberOfExcercises) {
      this.resetExcercise();
      await this.router.navigate(['tabs/tab1/training-completed']);
    } else {
      this.excercise++;
    }
    this.setup();
  }

  oldVal: number = -1
  offset: number = 0

  onSliderChange(ev: any) {
    //TODO when turning to fast events are omitted
    // if (ev.args.value == 0 && this.oldVal > 50) {
    //   this.offset++
    // } else if (ev.args.value == 0 && this.oldVal < 50) {
    //   this.offset--
    // }
    this.oldVal = this.sliderValue
    this.sliderValue = ev.args.value;
    this.synth.setNote(this.currentNote + this.calculateSelectedDif());
  }

  setup(setKnob = true) {
    this.sliderValue = 50;
    const oldNote = this.currentNote
    if (setKnob) {
      this.myKnob.val(50)
    }

    do {
      this.currentNote = getRandomProperty(this.notes)
    } while (oldNote == this.currentNote)

    this.randomToneOffset = (Math.random() * (30 - 10) + 10) * (Math.random() < 0.5 ? -1 : 1);

    console.log(this.randomToneOffset)
    console.log(this.currentNote)
  }

  resetExcercise() {
    this.excercise = 1;
  }

  async abortExcersise() {
    const alert = await this.alertController.create({
      header: 'Übung abbrechen',
      message: 'Möchtest du diese Übung wirklich abbrechen?',
      buttons: [{
        text: 'Nein',
        role: 'cancel'
      }, {
        text: 'ja',
        role: 'destructive',
        handler: () => {
          this.resetExcercise();
          this.router.navigate(['/tabs/tab1']);
        }
      }],
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  private hideTabbar() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  private showTabbar() {
    const tabs = document.querySelectorAll('ion-tab-bar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'flex';
      });
    }
  }
}

function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}

function calcCents(f1: number, f2: number) {
  return 1200 * Math.log2(f2 / f1);
}
