import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProgressData } from '../../providers/progressdata';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LandingPage } from '../landing/landing';

/**
 * Generated class for the PlusnotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plusnotes',
  templateUrl: 'plusnotes.html',
})
export class PlusnotesPage {
  sleepHour: { upper: number, lower: number}={
    upper:10,
    lower:0
  };

  stressLevel: number = 0;
  generalNote: string ="";
  medicationNote: string ;
  supplementNote: string;
  dietNote: string;
  datetime: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public progressData: ProgressData, public sqlite: SQLite) {
    this.datetime = Date.now(); 
    
   
    if(localStorage.getItem('setting_lowersleephour') == null || localStorage.getItem('setting_uppersleephour') == null) {
      this.sleepHour.lower = 0;
      this.sleepHour.upper = 17;
    } else {
      this.sleepHour.lower = parseInt(localStorage.getItem("setting_lowersleephour"));
      this.sleepHour.upper = parseInt(localStorage.getItem('setting_uppersleephour'));
    }

    if(localStorage.getItem('setting_stresslevel') == null) {
      this.stressLevel = 0;
    } else {
      this.stressLevel = parseInt(localStorage.getItem('setting_stresslevel'));
    }
    if(localStorage.getItem('setting_medicationnote') == null) {
      this.medicationNote = '';
    }else {
      this.medicationNote = localStorage.getItem('setting_medicationnote') + '';
    }
    if(localStorage.getItem('setting_supplementnote') == null) {
      this.supplementNote = '';
    }else {
      this.supplementNote = localStorage.getItem('setting_supplementnote') + '';
    }
    if(localStorage.getItem('setting_dietnote') == null) {
      this.dietNote = '';
    }else {
      this.dietNote = localStorage.getItem('setting_dietnote') + '';
    }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlusnotesPage');
  }
  
  onBackTapped() {    
    this.navCtrl.pop();
  }

  removeReturnKey(val) {
    return val.replace(/\r?\n|\r/g,"@RETURN@");
  }
  onSubmitTapped() {
    
    localStorage.setItem('setting_lowersleephour',this.sleepHour.lower+'');
    localStorage.setItem('setting_uppersleephour',this.sleepHour.upper+'');
    localStorage.setItem('setting_stresslevel',this.stressLevel+'');
    localStorage.setItem('setting_medicationnote',this.medicationNote);
    localStorage.setItem('setting_supplementnote',this.supplementNote);
    localStorage.setItem('setting_dietnote',this.dietNote);

    this.progressData.setTestDatetime( this.datetime );
    this.progressData.setGeneralNote(this.generalNote);
    this.progressData.setLowerSleepHour( this.sleepHour.lower );
    this.progressData.setUpperSleepHour( this.sleepHour.upper );
    this.progressData.setStressLevel( this.stressLevel );
    this.progressData.setMedicationNote( this.medicationNote );
    this.progressData.setSupplementNote( this.supplementNote );
    this.progressData.setDietNote( this.dietNote );
    //alert(this.dietNote);
    this.progressData.getProgressJsonData().then((value)=>{
      var progressJsonData = this.removeReturnKey(value);

      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {          
          db.executeSql('create table if not exists progressData(id integer primary key autoincrement, is_left_hand integer, test_datetime integer, track_data text, speedtest_result integer, general_note text, lower_sleep_hour integer, upper_sleep_hour integer, stress_level integer, medication_note text, supplement_note text, diet_note text)',{})
            .then(() => {              
              var currentProgress = JSON.parse(JSON.stringify(eval("(" + progressJsonData +")")));
              
              //alert(currentProgress);
              //alert(currentProgress["is_left_hand"]);
              //console.log("////////////////////////////");

              var track_data_str: string =  JSON.stringify(currentProgress['track_data']);         
              
              //alert( track_data_str);
              var query = "insert into progressData (is_left_hand , test_datetime, track_data, speedtest_result, general_note, lower_sleep_hour, upper_sleep_hour, stress_level, medication_note, supplement_note, diet_note) values(" 
                + currentProgress['is_left_hand'] +"," + currentProgress['test_datetime'] + ",'" + track_data_str + "' ," + currentProgress['speedtest_result'] + ",'" 
                + currentProgress['general_note'] +"'," + currentProgress['lower_sleep_hour'] + "," + currentProgress['upper_sleep_hour'] + "," + currentProgress['stress_level'] + ",'" 
                + currentProgress['medication_note'] +"', '" + currentProgress['supplement_note'] +"','" + currentProgress['diet_note'] +"')";
              //alert(query);
               //alert(query);
              
              db.executeSql(query, {})
                .then(()=>{
                  this.navCtrl.push( LandingPage );
                })
                .catch(e => console.log(e));              
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
      
    });
  }
}
