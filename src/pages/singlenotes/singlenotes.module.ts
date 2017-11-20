import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglenotesPage } from './singlenotes';

@NgModule({
  declarations: [
    SinglenotesPage,
  ],
  imports: [
    IonicPageModule.forChild(SinglenotesPage),
  ],
})
export class SinglenotesPageModule {}
