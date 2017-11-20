import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {Content} from 'ionic-angular';
/**
 * Generated class for the SinglenotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
interface ProgressItem {
  progressId: number;  
  is_left_hand: number;
  test_datetime: number;
  track_data: string;
  speedtest_result: number;
  general_note: string;
  lower_sleep_hour: number;
  upper_sleep_hour: number;
  stress_level: number;
  medication_note: string;
  supplement_note: string;
  diet_note: string;
}

@IonicPage()
@Component({
  selector: 'page-singlenotes',
  templateUrl: 'singlenotes.html',
})

export class SinglenotesPage {  
    
  currentId: number = 0;
  currentDatetime: number;
  currentDragAccuracy: number;
  currentHitAccuracy: number;
  averageDragAccuracy: number;
  averageHitAccuracy: number;
  currentSteps: number = 0;
  currentKms: number = 0;
  currentGeneralNote: string;
  currentLowerSleepHour: number;
  currentUpperSleepHour: number;
  averageSleepHour: number;
  averageStressLevel: number;
  currentStressLevel: number;
  currentMedicationNote: string;
  currentSupplementNote: string;
  currentDietNote: string;
  currentProgressCount : number;
  currentIsLeft: boolean;
  progressArray: ProgressItem[] = [];  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite) {
    this.currentId = navParams.get('currentId');
    this.currentIsLeft = navParams.get('currentIsLeft');
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglenotesPage');
    
    var tempThis = this;
    tempThis.averageDragAccuracy = 0;
    tempThis.averageHitAccuracy = 0;
    tempThis.averageSleepHour = 0;
    tempThis.averageStressLevel = 0;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {   
      db.transaction(function(tx) {            
        tx.executeSql('SELECT * FROM progressData', [], function(tx, rs) {
          for(var i=0; i<rs.rows.length; i++) {
            var row = rs.rows.item(i); 
            if(row.is_left_hand == tempThis.currentIsLeft) {                        
              tempThis.progressArray.push({progressId: row.id,                  
                is_left_hand: row.is_left_hand,
                test_datetime: row.test_datetime,
                track_data: row.track_data,
                speedtest_result: row.speedtest_result,
                general_note: row.general_note,
                lower_sleep_hour: row.lower_sleep_hour,
                upper_sleep_hour: row.upper_sleep_hour,
                stress_level: row.stress_level,
                medication_note: row.medication_note,
                supplement_note: row.supplement_note,
                diet_note: row.diet_note});
              tempThis.averageDragAccuracy += tempThis.evaluateTrack(row.track_data);
              tempThis.averageHitAccuracy += row.speedtest_result;
              tempThis.averageSleepHour += (row.upper_sleep_hour - row.lower_sleep_hour);
              tempThis.averageStressLevel += row.stress_level;
            }
            
          }
          tempThis.averageDragAccuracy = Math.round(tempThis.averageDragAccuracy/tempThis.progressArray.length*100)/100;
          tempThis.averageHitAccuracy = Math.round(tempThis.averageHitAccuracy/tempThis.progressArray.length*100)/100;
          tempThis.averageSleepHour = Math.round(tempThis.averageSleepHour/tempThis.progressArray.length*100)/100;
          tempThis.averageStressLevel = Math.round(tempThis.averageStressLevel/tempThis.progressArray.length*100)/100;
          tempThis.currentProgressCount = tempThis.progressArray.length;
          tempThis.setCurrentProgressInfo();
        }, function(tx, error) {
          console.log('SELECT error: ' + error.message);
        });
      });
    })
    .catch(e => console.log(e));
    
  }

  onBackTapped() {
    this.navCtrl.pop();
  }

  backReturnKey(val) {
    return val.replace(/@RETURN@/g, "<br>");
  }
  setCurrentProgressInfo()
  {
    //alert(this.currentId);
    let tempThis = this;
    
    //alert("sfdasfasf" + tempThis.currentId);
    
    

    //console.log(tempThis.progressArray[tempThis.currentId]);
    tempThis.currentDatetime = tempThis.progressArray[tempThis.currentId].test_datetime;

    tempThis.currentDragAccuracy = Math.round(tempThis.evaluateTrack(tempThis.progressArray[tempThis.currentId].track_data)*100)/100;
    tempThis.currentHitAccuracy = tempThis.progressArray[tempThis.currentId].speedtest_result;
    
//              tempThis.currentSteps: number = 0;
//              tempThis.currentKms: number = 0;
    //document.getElementById("DateTime").innerHTML = tempThis.currentDatetime | date: 'EE dd MMM - hh:mm';
    
    tempThis.currentGeneralNote = this.backReturnKey(tempThis.progressArray[tempThis.currentId].general_note);
    //alert(tempThis.currentGeneralNote);

    tempThis.currentLowerSleepHour = tempThis.progressArray[tempThis.currentId].lower_sleep_hour;
    tempThis.currentUpperSleepHour = tempThis.progressArray[tempThis.currentId].upper_sleep_hour;
    tempThis.currentStressLevel = tempThis.progressArray[tempThis.currentId].stress_level;
    var tempCurrentMedicationNoteArray = tempThis.progressArray[tempThis.currentId].medication_note.split(",");
    var tempCurrentSupplementNoteArray = tempThis.progressArray[tempThis.currentId].supplement_note.split(",");
    var tempCurrentDietNoteArray = tempThis.progressArray[tempThis.currentId].diet_note.split(",");
    tempThis.currentMedicationNote="<p>Daily medication/dose</p>";
    for(var i=0; i<tempCurrentMedicationNoteArray.length;i++)
      tempThis.currentMedicationNote += ("<span>" + tempCurrentMedicationNoteArray[i] + "</span>");
    document.getElementById("MedicationNote").innerHTML = tempThis.currentMedicationNote;
    tempThis.currentSupplementNote="<p>Daily supplements/dose</p>";
    for(var i=0; i<tempCurrentSupplementNoteArray.length;i++)
      tempThis.currentSupplementNote += ("<span>" + tempCurrentSupplementNoteArray[i] + "</span>");
    document.getElementById("SupplementNote").innerHTML = tempThis.currentSupplementNote;
    tempThis.currentDietNote="<p>Diet</p>";
    for(var i=0; i<tempCurrentDietNoteArray.length;i++)
      tempThis.currentDietNote += ("<span>" + tempCurrentDietNoteArray[i] + "</span>");
    document.getElementById("DietNote").innerHTML = tempThis.currentDietNote;
  }
  onSwipeLeftEvent() {
    //alert("left");
    
    if( this.currentId == 0) {
      this.currentId = this.progressArray.length-1;
    }else {
      this.currentId --;
    }
    this.setCurrentProgressInfo();
  }

  onSwipeRightEvent() {
    //alert("right");
   
    if( this.currentId == this.progressArray.length-1) {
      this.currentId = 0;
    }else {
      this.currentId ++;
    }
    this.setCurrentProgressInfo();
    
  }

  onDeleteTapped() {
    if(this.progressArray.length == 0) return;
    let tempThis = this;
    tempThis.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {   
        db.transaction(function(tx) { 
          //alert(tempThis.progressArray[tempThis.currentId].progressId);           
          tx.executeSql("DELETE FROM progressData WHERE id = ?", [tempThis.progressArray[tempThis.currentId].progressId], function(tx, rs) { 
            tempThis.progressArray.slice(tempThis.currentId, 1);
            //if(tempThis.currentId > 0)
            //  tempThis.currentId --;
            //else
            //alert(tempThis.currentId);
            console.log(tempThis.progressArray);
            /*tempThis.currentId = 0;
            if(tempThis.progressArray.length == 0) {

            }else {
              tempThis.averageDragAccuracy = 0;
              tempThis.averageHitAccuracy = 0;
              tempThis.averageSleepHour = 0;
              tempThis.averageStressLevel = 0;
              for(var i=0; i<tempThis.progressArray.length; i++) {
                
                tempThis.averageDragAccuracy += tempThis.evaluateTrack(tempThis.progressArray[i].track_data);
                tempThis.averageHitAccuracy += tempThis.progressArray[i].speedtest_result;
                tempThis.averageSleepHour += (tempThis.progressArray[i].upper_sleep_hour - tempThis.progressArray[i].lower_sleep_hour);
                tempThis.averageStressLevel += tempThis.progressArray[i].stress_level;
              }
              //console.log(tempThis.progressArray);  
              //console.log(tempThis.progressArray[tempThis.currentId]);
              tempThis.currentDatetime = tempThis.progressArray[tempThis.currentId].test_datetime;

              tempThis.currentDragAccuracy = Math.round(tempThis.evaluateTrack(tempThis.progressArray[tempThis.currentId].track_data)*100)/100;
              tempThis.currentHitAccuracy = tempThis.progressArray[tempThis.currentId].speedtest_result;
              tempThis.averageDragAccuracy = Math.round(tempThis.averageDragAccuracy/tempThis.progressArray.length*100)/100;
              tempThis.averageHitAccuracy = Math.round(tempThis.averageHitAccuracy/tempThis.progressArray.length*100)/100;
              tempThis.averageSleepHour = Math.round(tempThis.averageSleepHour/tempThis.progressArray.length*100)/100;
              tempThis.averageStressLevel = Math.round(tempThis.averageStressLevel/tempThis.progressArray.length*100)/100;
//              tempThis.currentSteps: number = 0;
//              tempThis.currentKms: number = 0;
              tempThis.currentGeneralNote = tempThis.progressArray[tempThis.currentId].general_note;
              tempThis.currentLowerSleepHour = tempThis.progressArray[tempThis.currentId].lower_sleep_hour;
              tempThis.currentUpperSleepHour = tempThis.progressArray[tempThis.currentId].upper_sleep_hour;
              tempThis.currentStressLevel = tempThis.progressArray[tempThis.currentId].stress_level;
              var tempCurrentMedicationNoteArray = tempThis.progressArray[tempThis.currentId].medication_note.split(",");
              var tempCurrentSupplementNoteArray = tempThis.progressArray[tempThis.currentId].supplement_note.split(",");
              var tempCurrentDietNoteArray = tempThis.progressArray[tempThis.currentId].diet_note.split(",");
              tempThis.currentMedicationNote="<p>Daily medication/dose</p>";
              for(var i=0; i<tempCurrentMedicationNoteArray.length;i++)
                tempThis.currentMedicationNote += ("<span>" + tempCurrentMedicationNoteArray[i] + "</span>");
              document.getElementById("MedicationNote").innerHTML = tempThis.currentMedicationNote;
              tempThis.currentSupplementNote="<p>Daily supplements/dose</p>";
              for(var i=0; i<tempCurrentSupplementNoteArray.length;i++)
                tempThis.currentSupplementNote += ("<span>" + tempCurrentSupplementNoteArray[i] + "</span>");
              document.getElementById("SupplementNote").innerHTML = tempThis.currentSupplementNote;
              tempThis.currentDietNote="<p>Diet</p>";
              for(var i=0; i<tempCurrentDietNoteArray.length;i++)
                tempThis.currentDietNote += ("<span>" + tempCurrentDietNoteArray[i] + "</span>");
              document.getElementById("DietNote").innerHTML = tempThis.currentDietNote;
              
              tempThis.currentProgressCount = tempThis.progressArray.length;
              alert(tempThis.currentProgressCount);
          }*/
          });
        });
      });
  }
  
}
