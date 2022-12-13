import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingCompletedPageRoutingModule } from './training-completed-routing.module';

import { TrainingCompletedPage } from './training-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingCompletedPageRoutingModule
  ],
  declarations: [TrainingCompletedPage]
})
export class TrainingCompletedPageModule {}
