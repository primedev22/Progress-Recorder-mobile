import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrawPage } from '../draw/draw';
import { ProgressData } from '../../providers/progressdata';
import { SinglegalleryPage } from '../singlegallery/singlegallery';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { App  } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

interface progressItem
{
  id: number;
  date: number;
  isLeftHand: number;
  value: number;
}

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})


export class LandingPage {

  toggleMenu(event) {  
    var menu = document.getElementById('menu');
    menu.classList.toggle('open');

    var close = document.getElementById('close');
    close.classList.toggle('close');
  }

  progressArray: progressItem[] = [];
  currentIsLeft: number = 1;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public progressData: ProgressData, public sqlite: SQLite, public app: App) {
    
  }  

  evaluateTrack(track_data)
  {    
    var score = 0;
    var pt_array = JSON.parse(track_data);
    if(pt_array.length == 0) return 0;
    for( var i=0;i<pt_array.length; i++ )
    {
      if(pt_array[i].in)
        score ++;
    }
    score = score * 100/pt_array.length;
    return score;
  }

  onIsLeftTapped() {
    this.currentIsLeft = 1;
    document.getElementById("LeftToggle").classList.add( "active" ); 
    document.getElementById("RightToggle").classList.remove( "active" );  
    this.drawGraph();
  }
  onIsRightTapped() {
    this.currentIsLeft = 0;
    document.getElementById("LeftToggle").classList.remove( "active" ); 
    document.getElementById("RightToggle").classList.add( "active" ); 
    this.drawGraph();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');   
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
                tempThis.progressArray.push({id: row.id, date: row.test_datetime, isLeftHand: row.is_left_hand, value: tempThis.evaluateTrack(row.track_data)});
              }
              //alert(this.progressArray);
              tempThis.drawGraph();
            }, function(tx, error) {
              console.log('SELECT error: ' + error.message);
            });
          });
        })
        .catch(e => console.log(e));
  }

  drawGraph() {
    var graphContentDiv = document.getElementById("graph-cont");
    var innerContentValue: string = "";
    var count: number = 0;
    
    for( var x=0; x<this.progressArray.length; x++ ) {
      var i = this.progressArray.length - 1 - x;
      if( this.progressArray[i].isLeftHand == this.currentIsLeft ) { 
        //datetime | date: 'EE dd MMM - hh:mm'
        var tempDatetime = new Date(this.progressArray[i].date);
        innerContentValue += ('<div class="stick"><a href="#" style="height: ' + this.progressArray[i].value + '%;"><p>' + (tempDatetime.getMonth()+1) + '/' + tempDatetime.getDate() + '</p></a></div>');
        count++;
        if( count % 10 == 0) {
          graphContentDiv.innerHTML = innerContentValue;
        }
      }
    }
    document.getElementById("graph-cont").setAttribute("width",count*20+"px");
    document.getElementById("graph-cont-blue").setAttribute("width",count*20+"px");
    //alert(innerContentValue);
    graphContentDiv.innerHTML = innerContentValue;
  }

  onLeftHandTapped() {
    this.progressData.setIsLeftHand(1);  
    //this.navCtrl.popAll().then(()=>{this.navCtrl.push(DrawPage)}) .catch(()=>{console.log("aaa")});
    //this.navCtrl.push(DrawPage);
    //this.navCtrl.push(DrawPage); 
    this.app.getRootNav().setRoot( DrawPage );
    
  }

  onRightHandTapped() {
    this.progressData.setIsLeftHand(0);
    //this.navCtrl.push(DrawPage);
    this.app.getRootNav().setRoot( DrawPage );
  }
  
  onBackTapped() {
    this.navCtrl.pop();
  }
  onViewGalleryTapped() { 
    this.navCtrl.push( SinglegalleryPage );
  }

  onHomeTapped() {
    this.app.getRootNav().setRoot( HomePage );
  }

  onResetTapped() {

    const tempThis = this;
    
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {   
        db.transaction(function(tx) {            
          tx.executeSql('DELETE FROM progressData', [], function(tx, rs) {                
            console.log('aaa');
          }, function(tx, error) {
            console.log('Delete error: ' + error.message);
          });
        });
      })
      .catch(e => console.log(e));
      tempThis.app.getRootNav().setRoot( HomePage );

  }

}
