import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlusnotesPage } from './plusnotes';

@NgModule({
  declarations: [
    PlusnotesPage,
  ],
  imports: [
    IonicPageModule.forChild(PlusnotesPage),
  ],
})
export class PlusnotesPageModule {}
