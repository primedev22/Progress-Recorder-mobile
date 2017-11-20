import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeedexamPage} from '../speedexam/speedexam';
import { ProgressData } from '../../providers/progressdata';
import { CanvasDrawComponent } from '../../components/canvas-draw/canvas-draw';

/**
 * Generated class for the DrawPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-draw',
  templateUrl: 'draw.html',
})

export class DrawPage {

  // hide gotonediv
  closeOne(event) {
    
    var overlay = document.getElementById('gotonediv');
    overlay.classList.add('closed');
    localStorage.setItem('closeOne','closed-yes');
  }

  @ViewChild(CanvasDrawComponent) canvasDraw: CanvasDrawComponent;
  speedtestPage = SpeedexamPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public progressData: ProgressData) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrawPage');    
    this.canvasDraw.resetTrack(false);
    //alert();
  }

  onRedrawTapped() {
    this.canvasDraw.resetTrack(false);
  }
  onNextTapped() {
    this.progressData.setTrackData( JSON.stringify(this.canvasDraw.track) );    
    this.navCtrl.push( SpeedexamPage );
  }
  onBackTapped() {
    this.navCtrl.pop();
  }
}

// don't show gotonediv again
var closeOne = localStorage.getItem('closeOne') || '';
if (closeOne == 'closed-yes') {
  document.body.classList.add('seenOneBefore');
  //localStorage.removeItem('closeOne');
}