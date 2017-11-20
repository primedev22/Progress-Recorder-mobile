import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlusnotesPage } from '../plusnotes/plusnotes';
import { ProgressData } from '../../providers/progressdata';
import * as $ from 'jquery';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the SpeedexamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speedexam',
  templateUrl: 'speedexam.html',
})
export class SpeedexamPage {

  
  // hide gottwodiv
  closeTwo(event) {  
    var overlay = document.getElementById('gottwodiv');
    overlay.classList.add('closed');
    localStorage.setItem('closeTwo','closed-yes');
  }

  hitScore: number = 0;
  timeText: string = "15:00";
  scoreText: string;
  timeValue: number = 1500;
  sumScore: number = 0;
  cntScore: number = 0;
  topScore: number = 0;
  isTimeExpired: boolean = false;
  isTimeStarted: boolean = false;
  isLastAbove: boolean = false;
  plusnotesPage = PlusnotesPage;
  topRegionPtPosX: string = "50%";
  topRegionPtPosY: string = "50%";

  constructor(public navCtrl: NavController, public navParams: NavParams, public progressData: ProgressData, public sqlite: SQLite) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeedexamPage');
    //$('.TopRegion').attr( "top-circle-pos-x", "50%");
   // $('.TopRegion').attr( "top-circle-pos-y", "50%");
 
    let tempThis = this;
    tempThis.scoreText = "Average: 0 " + "\xa0" + " High score: 0";
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {   
        db.transaction(function(tx) {            
          tx.executeSql('SELECT * FROM progressData', [], function(tx, rs) {                
            
            for(var i=0; i<rs.rows.length; i++) {
              var row = rs.rows.item(i);                                
              tempThis.sumScore += row.speedtest_result;
              if( tempThis.topScore < row.speedtest_result ) tempThis.topScore = row.speedtest_result;
            }
            tempThis.cntScore = rs.rows.length;
            
            //alert(tempThis.progressArray);
            
            if(tempThis.cntScore > 0) {
              tempThis.scoreText = "Average: " + Math.round(tempThis.sumScore/tempThis.cntScore) + "  High score: " + tempThis.topScore;
            } else {
              tempThis.scoreText = "Average: 0  High score: 0";
            }             
          }, function(tx, error) {
            console.log('SELECT error: ' + error.message);
          });
        });
      })
      .catch(e => console.log(e));
    document.getElementById("TopRegion").hidden = false;
    document.getElementById("BottomRegion").hidden = false;
  }

  onRetestTapped() {     
    this.hitScore = 0;
    this.timeText = "15:00";   
    if(this.cntScore > 0) {
      this.scoreText = "Average: " + Math.round(this.sumScore/this.cntScore) + "\xa0\xa0" + " High score: " + this.topScore;
    } else {
      this.scoreText = "Average: " + 0 + "\xa0\xa0" + " High score: " + 0;
    }            
    this.timeValue = 1500;
    this.isTimeExpired = false;
    this.isTimeStarted = false;
    this.isLastAbove = false;
    document.getElementById("TopRegion").classList.add( "active" ); 
    document.getElementById("BottomRegion").classList.remove( "active" );      
    document.getElementById("TopRegion").classList.remove( "missed" );
    document.getElementById("BottomRegion").classList.remove( "missed" );
    document.getElementById("ButtonRetest").hidden = true;
    document.getElementById("ButtonNext").hidden = true;
    document.getElementById("TopRegion").hidden = false;
    document.getElementById("BottomRegion").hidden = false;
    document.getElementById("BackButton").hidden = false;
  }
  onTopAreaTapped(event) {
    let tempThis = this;   
    if( this.isTimeStarted && !this.isTimeExpired ) {
      let tempThis = this;
      if( !this.isLastAbove ) {
        this.hitScore ++;
        this.isLastAbove = true;
        document.getElementById("TopRegion").classList.remove( "active" ); 
        document.getElementById("BottomRegion").classList.add( "active" );      
        document.getElementById("TopRegion").classList.remove( "missed" );
                
        //document.getElementById("TopRegion:after").setAttribute("left",event.offsetX);
        //document.getElementById("TopRegion:after").setAttribute("top",event.offsetY);
        
      }else {
        document.getElementById("BottomRegion").classList.add( "missed" );
      }
    }   
    if( !this.isTimeStarted ) {
      tempThis.hitScore ++;
      this.isTimeStarted = true;
      this.isLastAbove = true;
      document.getElementById("TopRegion").classList.remove( "active" ); 
      document.getElementById("BottomRegion").classList.add( "active" ); 
      document.getElementById("BottomRegion").classList.remove( "missed" ); 
      var intervalId = setInterval( function(){
        tempThis.timeText = (Math.floor( tempThis.timeValue/100 ) < 10 ? '0' : '') + Math.floor( tempThis.timeValue/100 ) + ":" 
            + (Math.floor( tempThis.timeValue%100 ) < 10 ? '0' : '') + Math.floor( tempThis.timeValue%100 );
        tempThis.scoreText = "Score: " + tempThis.hitScore;
        tempThis.timeValue --;
  //   console.log(tempThis.timeValue);
        if( tempThis.timeValue == -1 ) {
          tempThis.isTimeExpired = true;
          clearInterval( intervalId );
          tempThis.timeText = "Your score: " + tempThis.hitScore;
          if( tempThis.hitScore > tempThis.topScore) tempThis.topScore = tempThis.hitScore;
          tempThis.cntScore ++;
          tempThis.sumScore = tempThis.sumScore + tempThis.hitScore;
          if(tempThis.topScore<tempThis.hitScore) tempThis.topScore > tempThis.hitScore;
          tempThis.scoreText = "Average: " + Math.round(tempThis.sumScore/tempThis.cntScore) + "\xa0\xa0" + " High score: " + tempThis.topScore;
          document.getElementById("ButtonRetest").hidden = false;
          document.getElementById("ButtonNext").hidden = false;
          document.getElementById("TopRegion").hidden = true;
          document.getElementById("BottomRegion").hidden = true;
          document.getElementById("BackButton").hidden = false;
        }
      }, 10)
    } 
  }
  onBottomAreaTapped(event) {
    //console.log(event );
    
    let tempThis = this;    

    if( this.isTimeStarted && !this.isTimeExpired ) {
      if(this.isLastAbove) {
        this.hitScore ++;
        this.isLastAbove = false;
        document.getElementById("TopRegion").classList.add( "active" ); 
        document.getElementById("BottomRegion").classList.remove( "active" ); 
        document.getElementById("BottomRegion").classList.remove( "missed" ); 
        //document.getElementById("BottomRegion").setAttribute("margin",event.offsetX+"px 0 0 "+event.offsetY+"px");
      }else {
        document.getElementById("TopRegion").classList.add( "missed" );
      }
    }   
  }

  onMissedAreaTapped() {    
    if(this.isLastAbove) {
      document.getElementById("BottomRegion").classList.add("missed");
    }else {
      document.getElementById("TopRegion").classList.add("missed");
    }
  }
  onBackTapped() {
    this.navCtrl.pop();
  }
  onNextTapped() {
    this.progressData.setSpeedtestResult(this.hitScore);
    this.navCtrl.push( PlusnotesPage );
  }
}

// don't show gotonediv again
var closeTwo = localStorage.getItem('closeTwo') || '';

if (closeTwo == 'closed-yes') {
  document.body.classList.add('seenTwoBefore');  
  //localStorage.removeItem('closeTwo');
}