import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { DrawPage } from '../pages/draw/draw';

import { SpeedexamPage } from '../pages/speedexam/speedexam';
import { PlusnotesPage } from '../pages/plusnotes/plusnotes';
import { LandingPage } from '../pages/landing/landing';
import { ProgressData } from '../providers/progressdata';
import { SinglegalleryPage } from '../pages/singlegallery/singlegallery';
import { SinglenotesPage } from '../pages/singlenotes/singlenotes';
import { IonicStorageModule } from '@ionic/storage';
import { CanvasDrawComponent } from '../components/canvas-draw/canvas-draw';
import { CanvasSinglegalleryComponent } from '../components/canvas-singlegallery/canvas-singlegallery';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DrawPage,

    SpeedexamPage,
    PlusnotesPage,
    LandingPage,
    SinglegalleryPage,
    SinglenotesPage,
    CanvasDrawComponent,
    CanvasSinglegalleryComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DrawPage,

    SpeedexamPage,
    PlusnotesPage,
    LandingPage,
    SinglegalleryPage,
    SinglenotesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProgressData ,
    SQLite,
    Keyboard
  ]
})
export class AppModule {
  
}
