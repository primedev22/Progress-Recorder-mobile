
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { SinglenotesPage} from '../singlenotes/singlenotes';
import { ProgressData } from '../../providers/progressdata';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CanvasSinglegalleryComponent } from '../../components/canvas-singlegallery/canvas-singlegallery';

/**
 * Generated class for the SinglegalleryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
interface ProgressItem {
  progressId: number;
  isLeft: number;
  datetime: number;
}
@IonicPage()
@Component({
  selector: 'page-singlegallery',
  templateUrl: 'singlegallery.html',
})
export class SinglegalleryPage {
  currentId: number = 0;  
  currentIsLeft: boolean = true;
  currentDatetime: number;
  currentProgressCount:number = 0;
  progressLeftArray: ProgressItem[] = [];
  progressRightArray: ProgressItem[] = [];  
  @ViewChild('singlegallery') canvasSinglegallery: CanvasSinglegalleryComponent;
  singlenotesPage = SinglenotesPage;
  emptyFlag: boolean;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public progressData: ProgressData, public sqlite: SQLite) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglegalleryPage');    
    let tempThis = this;    
    this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {   
          db.transaction(function(tx) {            
            tx.executeSql('SELECT * FROM progressData', [], function(tx, rs) {                
              
              for(var i=0; i<rs.rows.length; i++) {
                var row = rs.rows.item(i);
                if( row.is_left_hand )       
                  tempThis.progressLeftArray.push({progressId: row.id, isLeft: row.is_left_hand ,datetime: row.test_datetime});
                else
                  tempThis.progressRightArray.push({progressId: row.id, isLeft: row.is_left_hand ,datetime: row.test_datetime});
              }
              //alert(this.progressArray);
              tempThis.currentProgressCount = tempThis.progressLeftArray.length;
              if( tempThis.currentProgressCount > 0 ){
                tempThis.emptyFlag = false;
                tempThis.drawCurrentProgress();
              }else {
                
                tempThis.emptyFlag = true;
                tempThis.currentId = -1;
              }
              
            }, function(tx, error) {
              console.log('SELECT error: ' + error.message);
            });
          });
        })
        .catch(e => console.log(e));

    //alert();
    //document.getElementById("LeftToggle").classList.remove( "active" );
    //document.getElementById("RightToggle").classList.add( "hidden" );
    //alert(document.getElementById("RightToggle1").innerText);
  }
  onSwipeRightEvent() {
    //alert("left");
    if(!this.emptyFlag) {
      if( this.currentId == 0) {
        if(this.currentIsLeft) {
          this.currentId = this.progressLeftArray.length-1;
          this.currentProgressCount = this.progressLeftArray.length;
        } else {
          this.currentId = this.progressRightArray.length-1;
          this.currentProgressCount = this.progressRightArray.length;
        }
      }else {
        this.currentId --;
      }
      
      this.drawCurrentProgress();
    }
  }

  onSwipeLeftEvent() {
    //alert("right");
    if(!this.emptyFlag){
      if(this.currentIsLeft) {
        if( this.currentId == this.progressLeftArray.length-1) {
          this.currentId = 0;
        }else {
          this.currentId ++;
        }
        this.currentProgressCount = this.progressLeftArray.length;
        this.drawCurrentProgress();
      }else {
        if( this.currentId == this.progressRightArray.length-1) {
          this.currentId = 0;
        }else {
          this.currentId ++;
        }
        this.currentProgressCount = this.progressRightArray.length;
        this.drawCurrentProgress();
      }    
    }
  }

  onBackTapped() {
    this.navCtrl.pop();
  }
  drawCurrentProgress() {
    //this.currentProgressDatetime = this.progressArray[this.currentId].datetime;

    if( this.currentIsLeft ) {
      this.currentDatetime = this.progressLeftArray[this.currentId].datetime;
      this.canvasSinglegallery.progressId = this.progressLeftArray[this.currentId].progressId;
      this.canvasSinglegallery.drawProgress();
    }else {
      this.currentDatetime = this.progressRightArray[this.currentId].datetime;
      this.canvasSinglegallery.progressId = this.progressRightArray[this.currentId].progressId;
      this.canvasSinglegallery.drawProgress();
    }
  }

  onNotesTapped() {    
    this.navCtrl.push( SinglenotesPage ,{currentIsLeft: this.currentIsLeft, currentId: this.currentId});
  }
  onRightTapped() {
    document.getElementById("LeftToggle1").classList.remove( "active" );
    document.getElementById("RightToggle1").classList.add( "active" );
    this.currentId = 0;
    this.currentIsLeft = false;
    this.currentProgressCount = this.progressRightArray.length;
    if( this.currentProgressCount >0 ) {
      this.drawCurrentProgress();
      this.emptyFlag = false;
    }else {
      this.emptyFlag = true;
      this.currentId = -1;
      this.canvasSinglegallery.drawEmpty();
    }
  }
  onLeftTapped() {
    document.getElementById("LeftToggle1").classList.add( "active" );
    document.getElementById("RightToggle1").classList.remove( "active" );
    this.currentId = 0;
    this.currentIsLeft = true;
    this.currentProgressCount = this.progressLeftArray.length;
    if( this.currentProgressCount >0 ) {
      this.drawCurrentProgress();
      this.emptyFlag = false;
    }else {
      this.emptyFlag = true;
      this.currentId = -1;
      this.canvasSinglegallery.drawEmpty();
    }
  }
  onShareTapped() {
    
  }
}