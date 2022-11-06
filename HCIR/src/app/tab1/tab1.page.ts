import {Component} from '@angular/core';
import * as Tone from 'tone'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  synth: any;

  constructor() {
    this.synth = new Tone.Synth().toDestination();
  }

  playSound() {
    console.log('playing sound')

//play a middle 'C' for the duration of an 8th note
    this.synth.triggerAttackRelease("C4", "8n");
  }

}
