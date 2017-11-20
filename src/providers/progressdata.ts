import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ProgressData {
  constructor(
    public storage: Storage    
  ) {}

  setIsLeftHand(isLeftHand: number) : void {
    this.storage.set('is_left_hand', isLeftHand);
  };

  getIsLeftHand() : Promise<number> {
    return this.storage.get('is_left_hand').then((value) => {
      return value;
    });    
  }; 

  setTestDatetime(testDatetime: number) : void {
    this.storage.set('test_datetime', testDatetime);
  };

  getTestDatetime() : Promise<number> {
    return this.storage.get('test_datetime').then((value) => {
      return value;
    });
  };

  setTrackData(trackData: string) : void {
    this.storage.set('track_data', trackData);
  };

  getTrackData() : Promise<string> {
    return this.storage.get('track_data').then((value) => {
      return value;
    });
  };

  setSpeedtestResult(speedtestResult: number) : void {
    this.storage.set('speedtest_result', speedtestResult);
  };

  getSpeedtestResult() : Promise<number> {
    return this.storage.get('speedtest_result').then((value) => {
      return value;
    });
  };

  setGeneralNote(generalNote: string) : void {
    this.storage.set('general_note', generalNote);
  };

  getGeneralNote() : Promise<string> {
    return this.storage.get('general_note').then((value) => {
      return value;
    });
  };

  setLowerSleepHour(lowerSleepHour: number) : void {
    this.storage.set('lower_sleep_hour', lowerSleepHour);
  };

  getLowerSleepHour() : Promise<number> {
    return this.storage.get('lower_sleep_hour').then((value) => {
      return value;
    });
  };

  setUpperSleepHour(upperSleepHour: number) : void {
    this.storage.set('upper_sleep_hour', upperSleepHour);
  };

  getUpperSleepHour() : Promise<number> {
    return this.storage.get('upper_sleep_hour').then((value) => {
      return value;
    });
  };

  setStressLevel(stressLevel: number) : void {
    this.storage.set('stress_level', stressLevel);
  };

  getStressLevel() : Promise<number> {
    return this.storage.get('stress_level').then((value) => {
      return value;
    });
  };

  setMedicationNote(medicationNote: string) : void {
    this.storage.set('medication_note', medicationNote);
  };

  getMedicationNote() : Promise<string> {
    return this.storage.get('medication_note').then((value) => {
      return value;
    });
  };

  setSupplementNote(supplementNote: string) : void {
    this.storage.set('supplement_note', supplementNote);
  };

  getSupplementNote() : Promise<string> {
    return this.storage.get('supplement_note').then((value) => {
      return value;
    });
  };

  setDietNote(dietNote: string) : void {
    this.storage.set('diet_note', dietNote);
  };

  getDietNote() : Promise<string> {
    return this.storage.get('diet_note').then((value) => {
      return value;
    });
  };

  getProgressJsonData() : Promise<string> {
    var progressData: string = "{";
    return this.storage.get('is_left_hand').then((value) => {
      progressData += 'is_left_hand :' + value + ',';
      return this.storage.get('test_datetime').then((value) => {
        progressData += 'test_datetime :"' + value + '",';
        return this.storage.get('track_data').then((value) => {
          progressData += 'track_data :' + value + ',';
          return this.storage.get('speedtest_result').then((value) => {
            progressData += 'speedtest_result :' + value + ',';
            return this.storage.get('general_note').then((value) => {
              progressData += 'general_note :"' + value + '",';
              return this.storage.get('lower_sleep_hour').then((value) => {
                progressData += 'lower_sleep_hour :' + value + ',';
                return this.storage.get('upper_sleep_hour').then((value) => {
                  progressData += 'upper_sleep_hour :' + value + ',';
                  return this.storage.get('stress_level').then((value) => {
                    progressData += 'stress_level :' + value + ',';
                    return this.storage.get('medication_note').then((value) => {
                      progressData += 'medication_note : "' + value + '",';
                      return this.storage.get('supplement_note').then((value) => {
                        progressData += 'supplement_note : "' + value + '",';
                        return this.storage.get('diet_note').then((value) => {
                          progressData += 'diet_note :"' + value + '"}';
                          return progressData;
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });  
      }); 
    }); 
  }
}