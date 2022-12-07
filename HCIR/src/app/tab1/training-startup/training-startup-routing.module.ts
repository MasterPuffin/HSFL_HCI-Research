import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingStartupPage } from './training-startup.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingStartupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingStartupPageRoutingModule {}
