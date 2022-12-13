import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingStartupPageRoutingModule } from './training-startup-routing.module';

import { TrainingStartupPage } from './training-startup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingStartupPageRoutingModule
  ],
  declarations: [TrainingStartupPage]
})
export class TrainingStartupPageModule {}
