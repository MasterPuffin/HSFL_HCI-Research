import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-training-startup',
  templateUrl: './training-startup.page.html',
  styleUrls: ['./training-startup.page.scss'],
})
export class TrainingStartupPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  startTraining() {
    this.router.navigate(['tab1/training']);
    console.log('Test');
  }

}
