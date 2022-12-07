import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'training-startup',
    loadChildren: () => import('./training-startup/training-startup.module').then( m => m.TrainingStartupPageModule)
  },
  {
    path: 'training-completed',
    loadChildren: () => import('./training-completed/training-completed.module').then( m => m.TrainingCompletedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
