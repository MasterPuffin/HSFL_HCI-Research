import {Component, ViewChild} from '@angular/core';
import * as Tone from 'tone'
import {AlertController} from '@ionic/angular';
import {jqxKnobComponent} from "jqwidgets-ng/jqxknob";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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


  synth: any;
  sliderValue: number;
  currentNote: any
  randomToneOffset: number

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

  constructor(private alertController: AlertController) {
    this.synth = new Tone.Synth().toDestination();
    this.setup(false)
  }


  playReferenceSound() {
    this.synth.triggerAttackRelease(this.currentNote, "8n");
  }

  playSelectedSound() {
    this.synth.triggerAttackRelease(this.currentNote + this.calculateSelectedDif(), "8n");
  }

  calculateSelectedDif() {
    return (this.sliderValue + (this.offset * 100) - 50) * 1 + this.randomToneOffset
  }

  async confirmSelection() {
    const diff = Math.abs(this.calculateSelectedDif())

    const alert = await this.alertController.create({
      header: 'Ergebnis',
      message: 'Die Differenz beträgt: ' + Math.round(diff * 100) / 100 + ' Hz',
      buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();
    this.setup();
  }

  oldVal: number = -1
  offset: number = 0

  onSliderChange(ev: any) {
    //TODO when turning to fast events are omitted
    if (ev.args.value == 0 && this.oldVal > 50) {
      this.offset++
    } else if (ev.args.value == 0 && this.oldVal < 50) {
      this.offset--
    }
    this.oldVal = this.sliderValue
    this.sliderValue = ev.args.value;
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
}

function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}
