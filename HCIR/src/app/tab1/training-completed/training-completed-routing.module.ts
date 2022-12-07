import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingCompletedPage } from './training-completed.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingCompletedPageRoutingModule {}
