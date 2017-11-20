import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DrawPage } from '../draw/draw';
import { LandingPage } from '../landing/landing';
//import { SinglenotesPage } from '../singlenotes/singlenotes';
import { ProgressData } from '../../providers/progressdata';


//import { LandingPage } from '../landing/landing';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public progressData: ProgressData) {  
    
  }
  onLeftHandTapped() {
    this.progressData.setIsLeftHand(1);
    this.navCtrl.push( DrawPage );
    //this.navCtrl.push(LandingPage);
  }
  onRightHandTapped() {
    this.progressData.setIsLeftHand(0);
    this.navCtrl.push( DrawPage );
    //this.navCtrl.push( DrawPage );
  }
}