import {Component} from '@angular/core';
import * as Tone from 'tone'
import {RangeCustomEvent} from "@ionic/angular";
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  synth: any;
  sliderValue: number;
  currentNote: any

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

  steps: any

  constructor(private alertController: AlertController) {
    this.synth = new Tone.Synth().toDestination();
    this.setup()
  }


  playReferenceSound() {
    this.synth.triggerAttackRelease(this.currentNote, "8n");
  }

  playSelectedSound() {
    this.synth.triggerAttackRelease(this.steps[this.sliderValue], "8n");
  }

  async confirmSelection() {
    console.log(this.currentNote)
    console.log(this.steps[this.sliderValue])
    const diff = Math.abs(this.currentNote - this.steps[this.sliderValue])

    const alert = await this.alertController.create({
      header: 'Ergebnis',
      message: 'Die Differenz beträgt: ' + diff,
      buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();
    this.setup();
  }

  onSliderChange(ev: Event) {
    this.sliderValue = <number>(ev as RangeCustomEvent).detail.value;
  }

  setup() {
    this.sliderValue = 5;
    const oldNote = this.currentNote

    do {
      this.currentNote = getRandomProperty(this.notes)
    } while (oldNote == this.currentNote)

    console.log(this.currentNote)

    this.steps = []
    for (let i = 0; i < 10; i++) {
      this.steps[i] = this.currentNote + (i * 10 - 50);
    }
  }
}

function getRandomProperty(obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
}
