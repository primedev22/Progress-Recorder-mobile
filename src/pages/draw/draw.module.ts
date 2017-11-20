import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrawPage } from './draw';

@NgModule({
  declarations: [
    DrawPage,
  ],
  imports: [
    IonicPageModule.forChild(DrawPage),
  ],
})
export class DrawPageModule {}
