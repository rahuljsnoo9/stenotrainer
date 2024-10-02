import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { DictationComponent } from './dictation/dictation.component';
import { PracticeComponent } from './practice/practice.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'practice/:id',
    component: PracticeComponent
  },
  {
    path: 'dictation',
    component: DictationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
