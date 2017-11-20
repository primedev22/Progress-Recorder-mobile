webpackJsonp([6],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SinglenotesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SinglenotesPage = (function () {
    function SinglenotesPage(navCtrl, navParams, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.currentId = 0;
        this.currentSteps = 0;
        this.currentKms = 0;
        this.progressArray = [];
        this.currentId = navParams.get('currentId');
        this.currentIsLeft = navParams.get('currentIsLeft');
    }
    SinglenotesPage.prototype.evaluateTrack = function (track_data) {
        var score = 0;
        var pt_array = JSON.parse(track_data);
        if (pt_array.length == 0)
            return 0;
        for (var i = 0; i < pt_array.length; i++) {
            if (pt_array[i].in)
                score++;
        }
        score = score * 100 / pt_array.length;
        return score;
    };
    SinglenotesPage.prototype.ionViewDidLoad = function () {
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
            .then(function (db) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM progressData', [], function (tx, rs) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        var row = rs.rows.item(i);
                        if (row.is_left_hand == tempThis.currentIsLeft) {
                            tempThis.progressArray.push({ progressId: row.id,
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
                                diet_note: row.diet_note });
                            tempThis.averageDragAccuracy += tempThis.evaluateTrack(row.track_data);
                            tempThis.averageHitAccuracy += row.speedtest_result;
                            tempThis.averageSleepHour += (row.upper_sleep_hour - row.lower_sleep_hour);
                            tempThis.averageStressLevel += row.stress_level;
                        }
                    }
                    tempThis.averageDragAccuracy = Math.round(tempThis.averageDragAccuracy / tempThis.progressArray.length * 100) / 100;
                    tempThis.averageHitAccuracy = Math.round(tempThis.averageHitAccuracy / tempThis.progressArray.length * 100) / 100;
                    tempThis.averageSleepHour = Math.round(tempThis.averageSleepHour / tempThis.progressArray.length * 100) / 100;
                    tempThis.averageStressLevel = Math.round(tempThis.averageStressLevel / tempThis.progressArray.length * 100) / 100;
                    tempThis.currentProgressCount = tempThis.progressArray.length;
                    tempThis.setCurrentProgressInfo();
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        })
            .catch(function (e) { return console.log(e); });
    };
    SinglenotesPage.prototype.onBackTapped = function () {
        this.navCtrl.pop();
    };
    SinglenotesPage.prototype.backReturnKey = function (val) {
        return val.replace(/@RETURN@/g, "<br>");
    };
    SinglenotesPage.prototype.setCurrentProgressInfo = function () {
        //alert(this.currentId);
        var tempThis = this;
        //alert("sfdasfasf" + tempThis.currentId);
        //console.log(tempThis.progressArray[tempThis.currentId]);
        tempThis.currentDatetime = tempThis.progressArray[tempThis.currentId].test_datetime;
        tempThis.currentDragAccuracy = Math.round(tempThis.evaluateTrack(tempThis.progressArray[tempThis.currentId].track_data) * 100) / 100;
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
        tempThis.currentMedicationNote = "<p>Daily medication/dose</p>";
        for (var i = 0; i < tempCurrentMedicationNoteArray.length; i++)
            tempThis.currentMedicationNote += ("<span>" + tempCurrentMedicationNoteArray[i] + "</span>");
        document.getElementById("MedicationNote").innerHTML = tempThis.currentMedicationNote;
        tempThis.currentSupplementNote = "<p>Daily supplements/dose</p>";
        for (var i = 0; i < tempCurrentSupplementNoteArray.length; i++)
            tempThis.currentSupplementNote += ("<span>" + tempCurrentSupplementNoteArray[i] + "</span>");
        document.getElementById("SupplementNote").innerHTML = tempThis.currentSupplementNote;
        tempThis.currentDietNote = "<p>Diet</p>";
        for (var i = 0; i < tempCurrentDietNoteArray.length; i++)
            tempThis.currentDietNote += ("<span>" + tempCurrentDietNoteArray[i] + "</span>");
        document.getElementById("DietNote").innerHTML = tempThis.currentDietNote;
    };
    SinglenotesPage.prototype.onSwipeLeftEvent = function () {
        //alert("left");
        if (this.currentId == 0) {
            this.currentId = this.progressArray.length - 1;
        }
        else {
            this.currentId--;
        }
        this.setCurrentProgressInfo();
    };
    SinglenotesPage.prototype.onSwipeRightEvent = function () {
        //alert("right");
        if (this.currentId == this.progressArray.length - 1) {
            this.currentId = 0;
        }
        else {
            this.currentId++;
        }
        this.setCurrentProgressInfo();
    };
    SinglenotesPage.prototype.onDeleteTapped = function () {
        if (this.progressArray.length == 0)
            return;
        var tempThis = this;
        tempThis.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            db.transaction(function (tx) {
                //alert(tempThis.progressArray[tempThis.currentId].progressId);           
                tx.executeSql("DELETE FROM progressData WHERE id = ?", [tempThis.progressArray[tempThis.currentId].progressId], function (tx, rs) {
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
    };
    return SinglenotesPage;
}());
SinglenotesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-singlenotes',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/singlenotes/singlenotes.html"*/'<ion-nav id="nav" #rootNavController [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<ion-content no-bounce>\n  <div (swipeleft)="onSwipeLeftEvent()" (swiperight)="onSwipeRightEvent()">\n    <div class="actions-top blue">\n      <a href="#" class="top-link left" (click)="onBackTapped()">Back</a>\n      <a href="#" class="top-link right" (click)="onBackTapped()">Image</a>\n      <h1>{{currentDatetime | date: \'EE dd MMM - hh:mm\'}}</h1>\n      <small>{{currentId+1}} of {{currentProgressCount}}</small>\n    </div>\n    <div class="notes-top">\n      <div class="blue-detail">\n        <div>\n          <h2>{{currentDragAccuracy  }}%</h2>\n          <p>Accuracy (Avg {{averageDragAccuracy }}%)</p>\n        </div>\n        <div>\n          <h2>{{currentHitAccuracy}}</h2>\n          <p>Tap test (Avg {{averageHitAccuracy }})</p>\n        </div>\n      </div>\n      <!-- <div class="steps-detail">\n        <div>\n          <h3>3,000</h3>\n          <p>Steps (Total 4,897)</p>\n        </div>\n        <div>\n          <h3>4.126</h3>\n          <p>Kms (Total 6.734)</p>\n        </div>\n      </div> -->\n    </div>\n    <div class="notes" [innerHtml]="\'<h4>\' + currentGeneralNote+ \'</h4>\'">\n    </div>\n    <div class="sleep-detail">\n      <div>\n        <h3>{{(currentUpperSleepHour-currentLowerSleepHour)}}</h3>\n        <p>Hours sleep (Avg {{averageSleepHour  }})</p>\n      </div>\n      <div>\n        <h3>{{currentStressLevel}}</h3>\n        <p>Stress / 10 (Avg {{averageStressLevel}})</p>\n      </div>\n    </div>\n    <div class="row-detail" id="MedicationNote">\n      <p>Daily medication/dose</p>\n      {{currentMedicationNote}}\n    </div>\n    <div class="row-detail" id="SupplementNote">\n      <p>Daily supplements/dose</p>\n      {{currentSupplementNote}}\n    </div>\n    <div class="row-detail" id="DietNote">\n      <p>Diet</p>\n      {{currentDietNote}}\n    </div>\n\n    <!-- <div class="actions-bottom">\n      <a href="#" class="btn btn-grey left">Edit</a>\n      <a href="#" class="btn btn-grey left" (click)="onDeleteTapped()">Delete</a>\n      <a href="#" class="btn right">Share</a>\n    </div> -->\n  </div>\n</ion-content>\n\n\n\n'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/singlenotes/singlenotes.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
], SinglenotesPage);

//# sourceMappingURL=singlenotes.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SinglegalleryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__singlenotes_singlenotes__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_canvas_singlegallery_canvas_singlegallery__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SinglegalleryPage = (function () {
    function SinglegalleryPage(navCtrl, navParams, progressData, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.progressData = progressData;
        this.sqlite = sqlite;
        this.currentId = 0;
        this.currentIsLeft = true;
        this.currentProgressCount = 0;
        this.progressLeftArray = [];
        this.progressRightArray = [];
        this.singlenotesPage = __WEBPACK_IMPORTED_MODULE_2__singlenotes_singlenotes__["a" /* SinglenotesPage */];
    }
    SinglegalleryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SinglegalleryPage');
        var tempThis = this;
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM progressData', [], function (tx, rs) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        var row = rs.rows.item(i);
                        if (row.is_left_hand)
                            tempThis.progressLeftArray.push({ progressId: row.id, isLeft: row.is_left_hand, datetime: row.test_datetime });
                        else
                            tempThis.progressRightArray.push({ progressId: row.id, isLeft: row.is_left_hand, datetime: row.test_datetime });
                    }
                    //alert(this.progressArray);
                    tempThis.currentProgressCount = tempThis.progressLeftArray.length;
                    if (tempThis.currentProgressCount > 0) {
                        tempThis.emptyFlag = false;
                        tempThis.drawCurrentProgress();
                    }
                    else {
                        tempThis.emptyFlag = true;
                        tempThis.currentId = -1;
                    }
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        })
            .catch(function (e) { return console.log(e); });
        //alert();
        //document.getElementById("LeftToggle").classList.remove( "active" );
        //document.getElementById("RightToggle").classList.add( "hidden" );
        //alert(document.getElementById("RightToggle1").innerText);
    };
    SinglegalleryPage.prototype.onSwipeRightEvent = function () {
        //alert("left");
        if (!this.emptyFlag) {
            if (this.currentId == 0) {
                if (this.currentIsLeft) {
                    this.currentId = this.progressLeftArray.length - 1;
                    this.currentProgressCount = this.progressLeftArray.length;
                }
                else {
                    this.currentId = this.progressRightArray.length - 1;
                    this.currentProgressCount = this.progressRightArray.length;
                }
            }
            else {
                this.currentId--;
            }
            this.drawCurrentProgress();
        }
    };
    SinglegalleryPage.prototype.onSwipeLeftEvent = function () {
        //alert("right");
        if (!this.emptyFlag) {
            if (this.currentIsLeft) {
                if (this.currentId == this.progressLeftArray.length - 1) {
                    this.currentId = 0;
                }
                else {
                    this.currentId++;
                }
                this.currentProgressCount = this.progressLeftArray.length;
                this.drawCurrentProgress();
            }
            else {
                if (this.currentId == this.progressRightArray.length - 1) {
                    this.currentId = 0;
                }
                else {
                    this.currentId++;
                }
                this.currentProgressCount = this.progressRightArray.length;
                this.drawCurrentProgress();
            }
        }
    };
    SinglegalleryPage.prototype.onBackTapped = function () {
        this.navCtrl.pop();
    };
    SinglegalleryPage.prototype.drawCurrentProgress = function () {
        //this.currentProgressDatetime = this.progressArray[this.currentId].datetime;
        if (this.currentIsLeft) {
            this.currentDatetime = this.progressLeftArray[this.currentId].datetime;
            this.canvasSinglegallery.progressId = this.progressLeftArray[this.currentId].progressId;
            this.canvasSinglegallery.drawProgress();
        }
        else {
            this.currentDatetime = this.progressRightArray[this.currentId].datetime;
            this.canvasSinglegallery.progressId = this.progressRightArray[this.currentId].progressId;
            this.canvasSinglegallery.drawProgress();
        }
    };
    SinglegalleryPage.prototype.onNotesTapped = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__singlenotes_singlenotes__["a" /* SinglenotesPage */], { currentIsLeft: this.currentIsLeft, currentId: this.currentId });
    };
    SinglegalleryPage.prototype.onRightTapped = function () {
        document.getElementById("LeftToggle1").classList.remove("active");
        document.getElementById("RightToggle1").classList.add("active");
        this.currentId = 0;
        this.currentIsLeft = false;
        this.currentProgressCount = this.progressRightArray.length;
        if (this.currentProgressCount > 0) {
            this.drawCurrentProgress();
            this.emptyFlag = false;
        }
        else {
            this.emptyFlag = true;
            this.currentId = -1;
            this.canvasSinglegallery.drawEmpty();
        }
    };
    SinglegalleryPage.prototype.onLeftTapped = function () {
        document.getElementById("LeftToggle1").classList.add("active");
        document.getElementById("RightToggle1").classList.remove("active");
        this.currentId = 0;
        this.currentIsLeft = true;
        this.currentProgressCount = this.progressLeftArray.length;
        if (this.currentProgressCount > 0) {
            this.drawCurrentProgress();
            this.emptyFlag = false;
        }
        else {
            this.emptyFlag = true;
            this.currentId = -1;
            this.canvasSinglegallery.drawEmpty();
        }
    };
    SinglegalleryPage.prototype.onShareTapped = function () {
    };
    return SinglegalleryPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_13" /* ViewChild */])('singlegallery'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__components_canvas_singlegallery_canvas_singlegallery__["a" /* CanvasSinglegalleryComponent */])
], SinglegalleryPage.prototype, "canvasSinglegallery", void 0);
SinglegalleryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-singlegallery',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/singlegallery/singlegallery.html"*/'<ion-nav id="nav" #rootNavController [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<ion-content no-bounce>\n  <div (swipeleft)="onSwipeLeftEvent()" (swiperight)="onSwipeRightEvent()">\n    <div class="actions-top">\n      <a href="#" class="top-link left" (click)="onBackTapped()">Back</a>\n      <a href="#" class="top-link right" (click)="onNotesTapped()">Details</a>\n      <h1 style="text-align: center">{{currentDatetime | date: \'EE dd MMM - hh:mm\'}}</h1>\n      <small>{{currentId+1}} of {{currentProgressCount}}</small>\n    </div>\n    \n    <div class="gallery-cont">    \n      <div class="draw-cont">          \n        <canvas-singlegallery #singlegallery></canvas-singlegallery>\n      </div>     \n    </div>\n\n    <div class="actions">\n      <a href="#"  id="LeftToggle1" (click)="onLeftTapped()" class="btn btn-white left active">Left</a>\n      <a href="#"  id="RightToggle1" (click)="onRightTapped()" class="btn btn-white left">Right</a>\n      <!-- <a href="#" class="btn right" (click)="onShareTapped()">Share</a> -->\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/singlegallery/singlegallery.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__["a" /* ProgressData */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]])
], SinglegalleryPage);

//# sourceMappingURL=singlegallery.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LandingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__draw_draw__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__singlegallery_singlegallery__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LandingPage = (function () {
    function LandingPage(navCtrl, navParams, progressData, sqlite, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.progressData = progressData;
        this.sqlite = sqlite;
        this.app = app;
        this.progressArray = [];
        this.currentIsLeft = 1;
    }
    LandingPage.prototype.toggleMenu = function (event) {
        var menu = document.getElementById('menu');
        menu.classList.toggle('open');
        var close = document.getElementById('close');
        close.classList.toggle('close');
    };
    LandingPage.prototype.evaluateTrack = function (track_data) {
        var score = 0;
        var pt_array = JSON.parse(track_data);
        if (pt_array.length == 0)
            return 0;
        for (var i = 0; i < pt_array.length; i++) {
            if (pt_array[i].in)
                score++;
        }
        score = score * 100 / pt_array.length;
        return score;
    };
    LandingPage.prototype.onIsLeftTapped = function () {
        this.currentIsLeft = 1;
        document.getElementById("LeftToggle").classList.add("active");
        document.getElementById("RightToggle").classList.remove("active");
        this.drawGraph();
    };
    LandingPage.prototype.onIsRightTapped = function () {
        this.currentIsLeft = 0;
        document.getElementById("LeftToggle").classList.remove("active");
        document.getElementById("RightToggle").classList.add("active");
        this.drawGraph();
    };
    LandingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LandingPage');
        var tempThis = this;
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM progressData', [], function (tx, rs) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        var row = rs.rows.item(i);
                        tempThis.progressArray.push({ id: row.id, date: row.test_datetime, isLeftHand: row.is_left_hand, value: tempThis.evaluateTrack(row.track_data) });
                    }
                    //alert(this.progressArray);
                    tempThis.drawGraph();
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        })
            .catch(function (e) { return console.log(e); });
    };
    LandingPage.prototype.drawGraph = function () {
        var graphContentDiv = document.getElementById("graph-cont");
        var innerContentValue = "";
        var count = 0;
        for (var x = 0; x < this.progressArray.length; x++) {
            var i = this.progressArray.length - 1 - x;
            if (this.progressArray[i].isLeftHand == this.currentIsLeft) {
                //datetime | date: 'EE dd MMM - hh:mm'
                var tempDatetime = new Date(this.progressArray[i].date);
                innerContentValue += ('<div class="stick"><a href="#" style="height: ' + this.progressArray[i].value + '%;"><p>' + (tempDatetime.getMonth() + 1) + '/' + tempDatetime.getDate() + '</p></a></div>');
                count++;
                if (count % 10 == 0) {
                    graphContentDiv.innerHTML = innerContentValue;
                }
            }
        }
        document.getElementById("graph-cont").setAttribute("width", count * 20 + "px");
        document.getElementById("graph-cont-blue").setAttribute("width", count * 20 + "px");
        //alert(innerContentValue);
        graphContentDiv.innerHTML = innerContentValue;
    };
    LandingPage.prototype.onLeftHandTapped = function () {
        this.progressData.setIsLeftHand(1);
        //this.navCtrl.popAll().then(()=>{this.navCtrl.push(DrawPage)}) .catch(()=>{console.log("aaa")});
        //this.navCtrl.push(DrawPage);
        //this.navCtrl.push(DrawPage); 
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__draw_draw__["a" /* DrawPage */]);
    };
    LandingPage.prototype.onRightHandTapped = function () {
        this.progressData.setIsLeftHand(0);
        //this.navCtrl.push(DrawPage);
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__draw_draw__["a" /* DrawPage */]);
    };
    LandingPage.prototype.onBackTapped = function () {
        this.navCtrl.pop();
    };
    LandingPage.prototype.onViewGalleryTapped = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__singlegallery_singlegallery__["a" /* SinglegalleryPage */]);
    };
    LandingPage.prototype.onHomeTapped = function () {
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
    };
    LandingPage.prototype.onResetTapped = function () {
        var tempThis = this;
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM progressData', [], function (tx, rs) {
                    console.log('aaa');
                }, function (tx, error) {
                    console.log('Delete error: ' + error.message);
                });
            });
        })
            .catch(function (e) { return console.log(e); });
        tempThis.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
    };
    return LandingPage;
}());
LandingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-landing',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/landing/landing.html"*/'<ion-nav id="nav" #rootNavController [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<ion-content no-bounce>\n  <div class="ld-graph">\n    <a id="close" href="#" class="toggle-menu" (click)="toggleMenu()"></a>\n    <div id="menu" class="menu">\n      <a href="#" (click)="onHomeTapped()">Home</a>\n      <a href="http://progressrecorderapp.com">Progressrecorderapp.com</a>\n      <a href="#" (click)="onResetTapped()">Reset all data</a>\n    </div>\n    <h1>Accuracy/date (%)</h1>\n    <p class="left-num">100<br>75<br>50<br>25</p>\n    <p class="right-num">100<br>75<br>50<br>25</p>\n    <div class="toggle"><a href="#" id="LeftToggle" (click)="onIsLeftTapped()" class="active">Left Hand</a><a href="#" id="RightToggle" (click)="onIsRightTapped()">Right Hand</a></div>\n    <span class="twenty"></span>\n    <span class="fifty"></span>\n    <span class="seventy"></span>\n    <span class="hundred"></span>\n    <div class="graph">\n      <!-- This width needs to be workked out based on total entries -->\n      <div class="graph-cont" id="graph-cont">       \n      </div>\n      <!-- This width needs to be workked out based on total entries -->\n      <div class="blue" id="graph-cont-blue"></div>\n    </div>\n    <a href="#" class="btn btn-large btn-dark"(click)="onViewGalleryTapped()">View Gallery</a> \n  </div>  \n  <div class="actions-top">    \n  </div>\n  <div class="ld-actions">\n    <p class="instructions">Continue to record your progress and share<br>the results with your specialist</p>\n    <a class="first-hand hand" href="#" (click)="onLeftHandTapped()"><img src="assets/img/1_lefthand.svg"/>Left hand</a>\n    <a class="hand" href="#" (click)="onRightHandTapped()"><img src="assets/img/1_righthand.svg"/>Right hand</a>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/landing/landing.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__["a" /* ProgressData */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]])
], LandingPage);

//# sourceMappingURL=landing.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpeedexamPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__plusnotes_plusnotes__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SpeedexamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SpeedexamPage = (function () {
    function SpeedexamPage(navCtrl, navParams, progressData, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.progressData = progressData;
        this.sqlite = sqlite;
        this.hitScore = 0;
        this.timeText = "15:00";
        this.timeValue = 1500;
        this.sumScore = 0;
        this.cntScore = 0;
        this.topScore = 0;
        this.isTimeExpired = false;
        this.isTimeStarted = false;
        this.isLastAbove = false;
        this.plusnotesPage = __WEBPACK_IMPORTED_MODULE_2__plusnotes_plusnotes__["a" /* PlusnotesPage */];
        this.topRegionPtPosX = "50%";
        this.topRegionPtPosY = "50%";
    }
    // hide gottwodiv
    SpeedexamPage.prototype.closeTwo = function (event) {
        var overlay = document.getElementById('gottwodiv');
        overlay.classList.add('closed');
        localStorage.setItem('closeTwo', 'closed-yes');
    };
    SpeedexamPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SpeedexamPage');
        //$('.TopRegion').attr( "top-circle-pos-x", "50%");
        // $('.TopRegion').attr( "top-circle-pos-y", "50%");
        var tempThis = this;
        tempThis.scoreText = "Average: 0 " + "\xa0" + " High score: 0";
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM progressData', [], function (tx, rs) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        var row = rs.rows.item(i);
                        tempThis.sumScore += row.speedtest_result;
                        if (tempThis.topScore < row.speedtest_result)
                            tempThis.topScore = row.speedtest_result;
                    }
                    tempThis.cntScore = rs.rows.length;
                    //alert(tempThis.progressArray);
                    if (tempThis.cntScore > 0) {
                        tempThis.scoreText = "Average: " + Math.round(tempThis.sumScore / tempThis.cntScore) + "  High score: " + tempThis.topScore;
                    }
                    else {
                        tempThis.scoreText = "Average: 0  High score: 0";
                    }
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        })
            .catch(function (e) { return console.log(e); });
        document.getElementById("TopRegion").hidden = false;
        document.getElementById("BottomRegion").hidden = false;
    };
    SpeedexamPage.prototype.onRetestTapped = function () {
        this.hitScore = 0;
        this.timeText = "15:00";
        if (this.cntScore > 0) {
            this.scoreText = "Average: " + Math.round(this.sumScore / this.cntScore) + "\xa0\xa0" + " High score: " + this.topScore;
        }
        else {
            this.scoreText = "Average: " + 0 + "\xa0\xa0" + " High score: " + 0;
        }
        this.timeValue = 1500;
        this.isTimeExpired = false;
        this.isTimeStarted = false;
        this.isLastAbove = false;
        document.getElementById("TopRegion").classList.add("active");
        document.getElementById("BottomRegion").classList.remove("active");
        document.getElementById("TopRegion").classList.remove("missed");
        document.getElementById("BottomRegion").classList.remove("missed");
        document.getElementById("ButtonRetest").hidden = true;
        document.getElementById("ButtonNext").hidden = true;
        document.getElementById("TopRegion").hidden = false;
        document.getElementById("BottomRegion").hidden = false;
        document.getElementById("BackButton").hidden = false;
    };
    SpeedexamPage.prototype.onTopAreaTapped = function (event) {
        var tempThis = this;
        if (this.isTimeStarted && !this.isTimeExpired) {
            var tempThis_1 = this;
            if (!this.isLastAbove) {
                this.hitScore++;
                this.isLastAbove = true;
                document.getElementById("TopRegion").classList.remove("active");
                document.getElementById("BottomRegion").classList.add("active");
                document.getElementById("TopRegion").classList.remove("missed");
                //document.getElementById("TopRegion:after").setAttribute("left",event.offsetX);
                //document.getElementById("TopRegion:after").setAttribute("top",event.offsetY);
            }
            else {
                document.getElementById("BottomRegion").classList.add("missed");
            }
        }
        if (!this.isTimeStarted) {
            tempThis.hitScore++;
            this.isTimeStarted = true;
            this.isLastAbove = true;
            document.getElementById("TopRegion").classList.remove("active");
            document.getElementById("BottomRegion").classList.add("active");
            document.getElementById("BottomRegion").classList.remove("missed");
            var intervalId = setInterval(function () {
                tempThis.timeText = (Math.floor(tempThis.timeValue / 100) < 10 ? '0' : '') + Math.floor(tempThis.timeValue / 100) + ":"
                    + (Math.floor(tempThis.timeValue % 100) < 10 ? '0' : '') + Math.floor(tempThis.timeValue % 100);
                tempThis.scoreText = "Score: " + tempThis.hitScore;
                tempThis.timeValue--;
                //   console.log(tempThis.timeValue);
                if (tempThis.timeValue == -1) {
                    tempThis.isTimeExpired = true;
                    clearInterval(intervalId);
                    tempThis.timeText = "Your score: " + tempThis.hitScore;
                    if (tempThis.hitScore > tempThis.topScore)
                        tempThis.topScore = tempThis.hitScore;
                    tempThis.cntScore++;
                    tempThis.sumScore = tempThis.sumScore + tempThis.hitScore;
                    if (tempThis.topScore < tempThis.hitScore)
                        tempThis.topScore > tempThis.hitScore;
                    tempThis.scoreText = "Average: " + Math.round(tempThis.sumScore / tempThis.cntScore) + "\xa0\xa0" + " High score: " + tempThis.topScore;
                    document.getElementById("ButtonRetest").hidden = false;
                    document.getElementById("ButtonNext").hidden = false;
                    document.getElementById("TopRegion").hidden = true;
                    document.getElementById("BottomRegion").hidden = true;
                    document.getElementById("BackButton").hidden = false;
                }
            }, 10);
        }
    };
    SpeedexamPage.prototype.onBottomAreaTapped = function (event) {
        //console.log(event );
        var tempThis = this;
        if (this.isTimeStarted && !this.isTimeExpired) {
            if (this.isLastAbove) {
                this.hitScore++;
                this.isLastAbove = false;
                document.getElementById("TopRegion").classList.add("active");
                document.getElementById("BottomRegion").classList.remove("active");
                document.getElementById("BottomRegion").classList.remove("missed");
                //document.getElementById("BottomRegion").setAttribute("margin",event.offsetX+"px 0 0 "+event.offsetY+"px");
            }
            else {
                document.getElementById("TopRegion").classList.add("missed");
            }
        }
    };
    SpeedexamPage.prototype.onMissedAreaTapped = function () {
        if (this.isLastAbove) {
            document.getElementById("BottomRegion").classList.add("missed");
        }
        else {
            document.getElementById("TopRegion").classList.add("missed");
        }
    };
    SpeedexamPage.prototype.onBackTapped = function () {
        this.navCtrl.pop();
    };
    SpeedexamPage.prototype.onNextTapped = function () {
        this.progressData.setSpeedtestResult(this.hitScore);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__plusnotes_plusnotes__["a" /* PlusnotesPage */]);
    };
    return SpeedexamPage;
}());
SpeedexamPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-speedexam',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/speedexam/speedexam.html"*/'<ion-nav id="nav" #rootNavController [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<ion-content no-bounce >\n\n  <div id="gottwodiv" class="gottwodiv">\n    <div class="top">\n      <div class="circle"><img class="start" width="96" height="17" src="assets/img/4_starthere.svg"/></div>\n    </div>\n    <div class="middle">\n      <h2>Now your speed will be recorded<br>with a tap test</h2>\n      <p>Simply touch the alternating blue dot<br>as many times as you can in 15 seconds.</p>\n      <a href="#" id="gottwobtn" class="btn btn-large" (click)="closeTwo()">Got it</a>\n    </div>\n  </div>\n\n  <div class="actions-top">\n    <a href="#" class="top-link left" id="BackButton" (click)="onBackTapped()">Back</a>\n  </div>\n\n  <a href="#" class="target top-target active" (click)="onTopAreaTapped($event)" id="TopRegion"><div class="top-circle" id="TopCircle"></div></a>\n\n  <div class="score" (click)="onMissedAreaTapped()">\n    <h2>{{timeText}}</h2>\n    <p>{{scoreText}}</p>\n  </div>\n  \n  <!-- Shows missed:\n  <a href="#" class="target top-target missed"></a> -->\n  <a href="#" class="target bottom-target" (click)="onBottomAreaTapped($event)" id="BottomRegion"></a>\n\n  <!-- This takes up full screen in background.\n  So if you miss the target then you have a target to action the class change(missed) on the target. -->\n  <a href="#" class="missed-target" (click)="onMissedAreaTapped()"></a> \n\n  <div class="actions">\n    <a href="#" id="ButtonRetest" class="btn btn-grey left" (click)="onRetestTapped()" hidden>Retest</a>\n    <a href="#" id="ButtonNext" class="btn right" (click)="onNextTapped()" hidden>Next</a>\n  </div>   \n</ion-content>'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/speedexam/speedexam.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__["a" /* ProgressData */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]])
], SpeedexamPage);

// don't show gotonediv again
var closeTwo = localStorage.getItem('closeTwo') || '';
if (closeTwo == 'closed-yes') {
    document.body.classList.add('seenTwoBefore');
    //localStorage.removeItem('closeTwo');
}
//# sourceMappingURL=speedexam.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlusnotesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_progressdata__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__landing_landing__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PlusnotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PlusnotesPage = (function () {
    function PlusnotesPage(navCtrl, navParams, progressData, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.progressData = progressData;
        this.sqlite = sqlite;
        this.sleepHour = {
            upper: 10,
            lower: 0
        };
        this.stressLevel = 0;
        this.generalNote = "";
        this.datetime = Date.now();
        if (localStorage.getItem('setting_lowersleephour') == null || localStorage.getItem('setting_uppersleephour') == null) {
            this.sleepHour.lower = 0;
            this.sleepHour.upper = 17;
        }
        else {
            this.sleepHour.lower = parseInt(localStorage.getItem("setting_lowersleephour"));
            this.sleepHour.upper = parseInt(localStorage.getItem('setting_uppersleephour'));
        }
        if (localStorage.getItem('setting_stresslevel') == null) {
            this.stressLevel = 0;
        }
        else {
            this.stressLevel = parseInt(localStorage.getItem('setting_stresslevel'));
        }
        if (localStorage.getItem('setting_medicationnote') == null) {
            this.medicationNote = '';
        }
        else {
            this.medicationNote = localStorage.getItem('setting_medicationnote') + '';
        }
        if (localStorage.getItem('setting_supplementnote') == null) {
            this.supplementNote = '';
        }
        else {
            this.supplementNote = localStorage.getItem('setting_supplementnote') + '';
        }
        if (localStorage.getItem('setting_dietnote') == null) {
            this.dietNote = '';
        }
        else {
            this.dietNote = localStorage.getItem('setting_dietnote') + '';
        }
    }
    PlusnotesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PlusnotesPage');
    };
    PlusnotesPage.prototype.onBackTapped = function () {
        this.navCtrl.pop();
    };
    PlusnotesPage.prototype.removeReturnKey = function (val) {
        return val.replace(/\r?\n|\r/g, "@RETURN@");
    };
    PlusnotesPage.prototype.onSubmitTapped = function () {
        var _this = this;
        localStorage.setItem('setting_lowersleephour', this.sleepHour.lower + '');
        localStorage.setItem('setting_uppersleephour', this.sleepHour.upper + '');
        localStorage.setItem('setting_stresslevel', this.stressLevel + '');
        localStorage.setItem('setting_medicationnote', this.medicationNote);
        localStorage.setItem('setting_supplementnote', this.supplementNote);
        localStorage.setItem('setting_dietnote', this.dietNote);
        this.progressData.setTestDatetime(this.datetime);
        this.progressData.setGeneralNote(this.generalNote);
        this.progressData.setLowerSleepHour(this.sleepHour.lower);
        this.progressData.setUpperSleepHour(this.sleepHour.upper);
        this.progressData.setStressLevel(this.stressLevel);
        this.progressData.setMedicationNote(this.medicationNote);
        this.progressData.setSupplementNote(this.supplementNote);
        this.progressData.setDietNote(this.dietNote);
        //alert(this.dietNote);
        this.progressData.getProgressJsonData().then(function (value) {
            var progressJsonData = _this.removeReturnKey(value);
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('create table if not exists progressData(id integer primary key autoincrement, is_left_hand integer, test_datetime integer, track_data text, speedtest_result integer, general_note text, lower_sleep_hour integer, upper_sleep_hour integer, stress_level integer, medication_note text, supplement_note text, diet_note text)', {})
                    .then(function () {
                    var currentProgress = JSON.parse(JSON.stringify(eval("(" + progressJsonData + ")")));
                    //alert(currentProgress);
                    //alert(currentProgress["is_left_hand"]);
                    //console.log("////////////////////////////");
                    var track_data_str = JSON.stringify(currentProgress['track_data']);
                    //alert( track_data_str);
                    var query = "insert into progressData (is_left_hand , test_datetime, track_data, speedtest_result, general_note, lower_sleep_hour, upper_sleep_hour, stress_level, medication_note, supplement_note, diet_note) values("
                        + currentProgress['is_left_hand'] + "," + currentProgress['test_datetime'] + ",'" + track_data_str + "' ," + currentProgress['speedtest_result'] + ",'"
                        + currentProgress['general_note'] + "'," + currentProgress['lower_sleep_hour'] + "," + currentProgress['upper_sleep_hour'] + "," + currentProgress['stress_level'] + ",'"
                        + currentProgress['medication_note'] + "', '" + currentProgress['supplement_note'] + "','" + currentProgress['diet_note'] + "')";
                    //alert(query);
                    //alert(query);
                    db.executeSql(query, {})
                        .then(function () {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__landing_landing__["a" /* LandingPage */]);
                    })
                        .catch(function (e) { return console.log(e); });
                })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        });
    };
    return PlusnotesPage;
}());
PlusnotesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-plusnotes',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/plusnotes/plusnotes.html"*/'<ion-nav id="nav" #rootNavController [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<ion-content no-bounce padding>\n\n  <div class="actions-top">\n    <a href="#" class="top-link left" (click)="onBackTapped()">Back</a>\n    <h1>Progress notes</h1>\n    <small>{{datetime | date: \'EE dd MMM - hh:mm\'}}</small>\n  </div>\n\n  <div class="form-cont">\n\n    <div class="form-group">\n      <textarea class="main-textarea" [(ngModel)]="generalNote" stype="text" placeholder="How do you feel? What did you do?"></textarea>\n    </div>\n\n    <div class="form-group">\n      <div class="gotit">\n        <p>The following details will be remembered for future notes</p>\n        <!-- <a href="#" class="btn" (click)="onGotitTapped()">Got it</a> -->\n      </div>\n    </div>\n\n    <div class="form-group slider">\n      <h4>Sleep - {{sleepHour.upper - sleepHour.lower}} hours</h4>\n      <ion-item>\n        <ion-range dualKnobs="true" min="0" max="17" [(ngModel)]="sleepHour" color="secondary">\n          <ion-label range-left>{{[(this.sleepHour.lower + 18) % 24] + ":00"}}</ion-label>\n          <ion-label range-right>{{[(this.sleepHour.upper + 18) % 24] + ":00"}}</ion-label>\n        </ion-range>\n      </ion-item>\n    </div>\n\n    <div class="form-group slider">\n      <h4>Stress {{stressLevel}}/10</h4>\n      <ion-item>\n        <ion-range min="0" max="10" [(ngModel)]="stressLevel" color="secondary">\n          <ion-label range-left>Low</ion-label>\n          <ion-label range-right>High</ion-label>\n        </ion-range>\n      </ion-item>\n    </div>\n\n    <div class="form-group">\n      <h5>Daily medication/dose/quantity (comma separated)</h5>\n      <textarea [(ngModel)]="medicationNote" type="text" placeholder="E.g. Medication name 0.375mg x1, Medication name 1.5mg x3" onkeydown="if(event.keyCode == 13) return false;"></textarea>\n    </div>\n\n    <div class="form-group">\n      <h5>Daily supplements/quantity (comma separated)</h5>\n      <textarea [(ngModel)]="supplementNote" type="text" placeholder="E.g. Supplement name 0.375mg x1, Supplement name 1.5mg x3" onkeydown="if(event.keyCode == 13) return false;"></textarea>\n    </div>\n\n    <div class="form-group">\n      <h5>Diet (comma separated)</h5>\n      <textarea [(ngModel)]="dietNote" type="text" placeholder="E.g. Diet name" onkeydown="if(event.keyCode == 13) return false;"></textarea>\n    </div>\n    <div class="form-group">\n      <a href="#" class="btn btn-large" (click)="onSubmitTapped()">Submit</a>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/plusnotes/plusnotes.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_progressdata__["a" /* ProgressData */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */]])
], PlusnotesPage);

//# sourceMappingURL=plusnotes.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/draw/draw.module": [
		281,
		5
	],
	"../pages/landing/landing.module": [
		278,
		4
	],
	"../pages/plusnotes/plusnotes.module": [
		279,
		3
	],
	"../pages/singlegallery/singlegallery.module": [
		277,
		2
	],
	"../pages/singlenotes/singlenotes.module": [
		276,
		1
	],
	"../pages/speedexam/speedexam.module": [
		280,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 157;

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasSinglegalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CanvasSinglegalleryComponent = (function () {
    function CanvasSinglegalleryComponent(platform, renderer, sqlite) {
        this.platform = platform;
        this.renderer = renderer;
        this.sqlite = sqlite;
        this.brushSize = 10;
        this.track = [];
    }
    CanvasSinglegalleryComponent.prototype.ngAfterViewInit = function () {
        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() * 0.8 + '');
    };
    CanvasSinglegalleryComponent.prototype.drawEmpty = function () {
        var tempPlatform = this.platform;
        var tempCanvasElement = this.canvas.nativeElement;
        var ctx = tempCanvasElement.getContext('2d');
        ctx.clearRect(0, 0, tempPlatform.width(), tempPlatform.height() * 0.8);
        ctx.font = "30px oswald";
        ctx.fillText('No Progress', tempPlatform.width() / 2 - 75, tempPlatform.height() * 0.4);
    };
    CanvasSinglegalleryComponent.prototype.drawProgress = function () {
        var tempThis = this;
        var imageTrack = new Image();
        var tempPlatform = this.platform;
        var tempCanvasElement = this.canvas.nativeElement;
        var offsetHeight;
        if (tempPlatform.width() <= 350) {
            offsetHeight = (tempPlatform.height() - 40 * 2 - 381) / 2;
        }
        else {
            offsetHeight = (tempPlatform.height() - 40 * 2 - 431) / 2;
        }
        imageTrack.onload = function () {
            var ctx = tempCanvasElement.getContext('2d');
            ctx.clearRect(0, 0, tempPlatform.width(), tempPlatform.height() * 0.8);
            if (tempPlatform.width() <= 350) {
                ctx.drawImage(imageTrack, 0, 0, 524, 763, (tempPlatform.width() - 262) / 2, offsetHeight, 262, 381);
            }
            else {
                ctx.drawImage(imageTrack, 0, 0, 633, 863, (tempPlatform.width() - 317) / 2, offsetHeight, 317, 431);
            }
        };
        if (tempPlatform.width() <= 350) {
            imageTrack.src = 'assets/img/3_track_se.png';
        }
        else {
            imageTrack.src = 'assets/img/3_track.png';
        }
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM progressData WHERE id=' + tempThis.progressId, [], function (tx, rs) {
                    ////////////////////////////                           
                    tempThis.track = JSON.parse(rs.rows.item(0).track_data);
                    tempThis.drawTrack();
                }, function (tx, error) {
                    console.log('SELECT error: ' + error.message);
                });
            });
        })
            .catch(function (e) { return console.log(e); });
        //console.log(this.track);
    };
    CanvasSinglegalleryComponent.prototype.drawTrack = function () {
        //alert();
        //console.log(this.track);
        for (var i = 1; i < this.track.length; i++) {
            this.drawLine(this.track[i - 1].x, this.track[i - 1].y, this.track[i].x, this.track[i].y, this.track[i].in);
        }
    };
    CanvasSinglegalleryComponent.prototype.drawLine = function (startX, startY, endX, endY, isIn) {
        //alert();
        var ctx = this.canvasElement.getContext('2d');
        if (startX >= 0 && endX >= 0) {
            ctx.beginPath();
            ctx.lineJoin = "round";
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.closePath();
        }
        if (!isIn) {
            ctx.strokeStyle = '#ff004c';
        }
        else {
            ctx.strokeStyle = '#0f70e7';
        }
        if (startX >= 0 && endX >= 0) {
            ctx.linewidth = this.brushSize;
            ctx.stroke();
        }
    };
    return CanvasSinglegalleryComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myCanvas'),
    __metadata("design:type", Object)
], CanvasSinglegalleryComponent.prototype, "canvas", void 0);
CanvasSinglegalleryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'canvas-singlegallery',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/components/canvas-singlegallery/canvas-singlegallery.html"*/'<!-- Generated template for the CanvasSinglegalleryComponent component -->\n<canvas #myCanvas >\n    \n</canvas>'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/components/canvas-singlegallery/canvas-singlegallery.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
], CanvasSinglegalleryComponent);

//# sourceMappingURL=canvas-singlegallery.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasDrawComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CanvasDrawComponent = (function () {
    function CanvasDrawComponent(platform, renderer) {
        this.platform = platform;
        this.renderer = renderer;
        this.brushSize = 10;
        this.flag = 0;
        this.track = [];
    }
    CanvasDrawComponent.prototype.ngAfterViewInit = function () {
        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() * 0.8 + '');
        this.offsetY = 40;
        this.flag = 0;
    };
    CanvasDrawComponent.prototype.resetTrack = function (isTracking) {
        var imageTrack = new Image();
        var tempThis = this;
        var tempPlatform = this.platform;
        var tempCanvasElement = this.canvas.nativeElement;
        var ctx = tempCanvasElement.getContext('2d');
        var offsetHeight;
        if (tempPlatform.width() <= 350) {
            offsetHeight = (tempPlatform.height() - this.offsetY * 2 - 381) / 2;
        }
        else {
            offsetHeight = (tempPlatform.height() - this.offsetY * 2 - 431) / 2;
        }
        imageTrack.onload = function () {
            ctx.clearRect(0, 0, tempPlatform.width(), tempPlatform.height() * 0.8);
            if (tempPlatform.width() <= 350) {
                ctx.drawImage(imageTrack, 0, 0, 524, 763, (tempPlatform.width() - 262) / 2, offsetHeight, 262, 381);
            }
            else {
                ctx.drawImage(imageTrack, 0, 0, 633, 863, (tempPlatform.width() - 317) / 2, offsetHeight, 317, 431);
                console.log(tempPlatform.width());
            }
            if (!isTracking) {
                var startingPosCenterX_1;
                var startingPosCenterY_1;
                if (tempPlatform.width() <= 350) {
                    startingPosCenterX_1 = tempThis.startingPosX = (tempPlatform.width() - 262) / 2 + 16;
                    startingPosCenterY_1 = tempThis.startingPosY = offsetHeight + 16;
                }
                else {
                    startingPosCenterX_1 = tempThis.startingPosX = (tempPlatform.width() - 317) / 2 + 16;
                    startingPosCenterY_1 = tempThis.startingPosY = offsetHeight + 16;
                }
                var imageStart = new Image();
                imageStart.onload = function () {
                    //alert(startingPosCenterX);     
                    ctx.drawImage(imageStart, startingPosCenterX_1 - 16, startingPosCenterY_1 - 16, 31, 31);
                    //ctx.drawImage( this, 100, 100);
                    //alert();
                };
                imageStart.src = 'assets/img/3_start.png';
                tempThis.flag = 0;
                tempThis.track = [];
            }
            if (tempPlatform.width() <= 350) {
                tempThis.endingPosX = (tempPlatform.width() - 262) / 2 + 17;
                tempThis.endingPosY = offsetHeight + 382 - 16;
            }
            else {
                tempThis.endingPosX = tempPlatform.width() / 2 + 158 - 16;
                tempThis.endingPosY = offsetHeight + 432 - 16;
            }
            ////////////////////
            /*
            var imageEnd = new Image();
              
              imageEnd.onload = function() {
                    
                ctx.drawImage( imageEnd, tempThis.endingPosX - 16, tempThis.endingPosY - 16, 31,31);
                
              }
              imageEnd.src = 'assets/img/3_start.png';
            */
            /////////////////
        };
        if (tempPlatform.width() <= 350) {
            imageTrack.src = 'assets/img/3_track_se.png';
        }
        else {
            imageTrack.src = 'assets/img/3_track.png';
        }
    };
    CanvasDrawComponent.prototype.handleStart = function (ev) {
        if (this.flag == 0) {
            if ((this.startingPosX - ev.touches[0].pageX) * (this.startingPosX - ev.touches[0].pageX)
                + (this.startingPosY - ev.touches[0].pageY + this.offsetY) * (this.startingPosY - ev.touches[0].pageY + this.offsetY) <= 25 * 25) {
                this.flag = 1;
                this.lastX = ev.touches[0].pageX;
                this.lastY = ev.touches[0].pageY - this.offsetY;
                this.track.push({ x: this.lastX, y: this.lastY, in: true });
                this.resetTrack(true);
            }
        }
        else if (this.flag == 1) {
            console.log("kill timer");
            clearInterval(this.myTimer);
            /*if(this.timerId > 0){
              clearInterval(this.timerId);
              alert("kill timer");
            } */
            var currentX = ev.touches[0].pageX;
            var currentY = ev.touches[0].pageY - this.offsetY;
            if (!((this.endingPosX - currentX) * (this.endingPosX - currentX)
                + (this.endingPosY - currentY) * (this.endingPosY - currentY) <= 15.5 * 15.5)
                && ((this.endingPosX - this.lastX) * (this.endingPosX - this.lastX)
                    + (this.endingPosY - this.lastY) * (this.endingPosY - this.lastY) <= 15.5 * 15.5)) {
                this.flag = 2;
            }
            else {
                this.drawLine(this.lastX, this.lastY, currentX, currentY);
                this.lastX = currentX;
                this.lastY = currentY;
            }
        }
    };
    CanvasDrawComponent.prototype.handleMove = function (ev) {
        //  console.log(this.flag);
        if (this.flag == 1) {
            var currentX = ev.touches[0].pageX;
            var currentY = ev.touches[0].pageY - this.offsetY;
            if (!((this.endingPosX - currentX) * (this.endingPosX - currentX)
                + (this.endingPosY - currentY) * (this.endingPosY - currentY) <= 15.5 * 15.5)
                && ((this.endingPosX - this.lastX) * (this.endingPosX - this.lastX)
                    + (this.endingPosY - this.lastY) * (this.endingPosY - this.lastY) <= 15.5 * 15.5)) {
                this.flag = 2;
            }
            else {
                this.drawLine(this.lastX, this.lastY, currentX, currentY);
                this.lastX = currentX;
                this.lastY = currentY;
            }
        }
    };
    CanvasDrawComponent.prototype.handleEnd = function (ev) {
        //console.log('end');
        //console.log(this.flag);
        var tempThis = this;
        if (this.flag == 1) {
            //alert(tempThis.timerId);
            console.log("handle end");
            console.log(ev);
            //let currentX = ev.touches[0].pageX;
            //let currentY = ev.touches[0].pageY - this.offsetY;
            this.drawLine(this.lastX, this.lastY, -1, -1);
            this.lastX = -1;
            this.lastY = -1;
            tempThis.myTimer = setInterval(function () {
                tempThis.flag = 2;
                console.log(tempThis.track);
                clearInterval(tempThis.myTimer);
            }, 2000);
        }
    };
    CanvasDrawComponent.prototype.drawLine = function (startX, startY, endX, endY) {
        var ctx = this.canvasElement.getContext('2d');
        if (startX >= 0 && endX >= 0) {
            ctx.beginPath();
            ctx.lineJoin = "round";
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.closePath();
        }
        var p = ctx.getImageData(endX, endY, 1, 1).data;
        //    console.log(p);
        if (p[0] == 0 && p[1] == 0 && p[2] == 0 || p[0] == 255) {
            ctx.strokeStyle = '#ff004c';
            this.track.push({ x: endX, y: endY, in: false });
        }
        else {
            ctx.strokeStyle = '#0f70e7';
            this.track.push({ x: endX, y: endY, in: true });
        }
        if (startX >= 0 && endX >= 0) {
            ctx.linewidth = this.brushSize;
            ctx.stroke();
        }
    };
    return CanvasDrawComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myCanvas'),
    __metadata("design:type", Object)
], CanvasDrawComponent.prototype, "canvas", void 0);
CanvasDrawComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'canvas-draw',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/components/canvas-draw/canvas-draw.html"*/'<!-- Generated template for the CanvasDrawComponent component -->\n\n<canvas #myCanvas (touchstart)="handleStart($event)" (touchmove)="handleMove($event) " (touchend)="handleEnd($event)">\n    \n</canvas>\n'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/components/canvas-draw/canvas-draw.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */]])
], CanvasDrawComponent);

//# sourceMappingURL=canvas-draw.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_draw_draw__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_speedexam_speedexam__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_plusnotes_plusnotes__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_landing_landing__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_progressdata__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_singlegallery_singlegallery__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_singlenotes_singlenotes__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_canvas_draw_canvas_draw__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_canvas_singlegallery_canvas_singlegallery__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_draw_draw__["a" /* DrawPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_speedexam_speedexam__["a" /* SpeedexamPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_plusnotes_plusnotes__["a" /* PlusnotesPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_landing_landing__["a" /* LandingPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_singlegallery_singlegallery__["a" /* SinglegalleryPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_singlenotes_singlenotes__["a" /* SinglenotesPage */],
            __WEBPACK_IMPORTED_MODULE_17__components_canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_canvas_singlegallery_canvas_singlegallery__["a" /* CanvasSinglegalleryComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/singlenotes/singlenotes.module#SinglenotesPageModule', name: 'SinglenotesPage', segment: 'singlenotes', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/singlegallery/singlegallery.module#SinglegalleryPageModule', name: 'SinglegalleryPage', segment: 'singlegallery', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/landing/landing.module#LandingPageModule', name: 'LandingPage', segment: 'landing', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/plusnotes/plusnotes.module#PlusnotesPageModule', name: 'PlusnotesPage', segment: 'plusnotes', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/speedexam/speedexam.module#SpeedexamPageModule', name: 'SpeedexamPage', segment: 'speedexam', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/draw/draw.module#DrawPageModule', name: 'DrawPage', segment: 'draw', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_draw_draw__["a" /* DrawPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_speedexam_speedexam__["a" /* SpeedexamPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_plusnotes_plusnotes__["a" /* PlusnotesPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_landing_landing__["a" /* LandingPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_singlegallery_singlegallery__["a" /* SinglegalleryPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_singlenotes_singlenotes__["a" /* SinglenotesPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_13__providers_progressdata__["a" /* ProgressData */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, keyboard) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            statusBar.hide();
            splashScreen.hide();
            keyboard.hideKeyboardAccessoryBar(false);
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProgressData = (function () {
    function ProgressData(storage) {
        this.storage = storage;
    }
    ProgressData.prototype.setIsLeftHand = function (isLeftHand) {
        this.storage.set('is_left_hand', isLeftHand);
    };
    ;
    ProgressData.prototype.getIsLeftHand = function () {
        return this.storage.get('is_left_hand').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setTestDatetime = function (testDatetime) {
        this.storage.set('test_datetime', testDatetime);
    };
    ;
    ProgressData.prototype.getTestDatetime = function () {
        return this.storage.get('test_datetime').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setTrackData = function (trackData) {
        this.storage.set('track_data', trackData);
    };
    ;
    ProgressData.prototype.getTrackData = function () {
        return this.storage.get('track_data').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setSpeedtestResult = function (speedtestResult) {
        this.storage.set('speedtest_result', speedtestResult);
    };
    ;
    ProgressData.prototype.getSpeedtestResult = function () {
        return this.storage.get('speedtest_result').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setGeneralNote = function (generalNote) {
        this.storage.set('general_note', generalNote);
    };
    ;
    ProgressData.prototype.getGeneralNote = function () {
        return this.storage.get('general_note').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setLowerSleepHour = function (lowerSleepHour) {
        this.storage.set('lower_sleep_hour', lowerSleepHour);
    };
    ;
    ProgressData.prototype.getLowerSleepHour = function () {
        return this.storage.get('lower_sleep_hour').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setUpperSleepHour = function (upperSleepHour) {
        this.storage.set('upper_sleep_hour', upperSleepHour);
    };
    ;
    ProgressData.prototype.getUpperSleepHour = function () {
        return this.storage.get('upper_sleep_hour').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setStressLevel = function (stressLevel) {
        this.storage.set('stress_level', stressLevel);
    };
    ;
    ProgressData.prototype.getStressLevel = function () {
        return this.storage.get('stress_level').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setMedicationNote = function (medicationNote) {
        this.storage.set('medication_note', medicationNote);
    };
    ;
    ProgressData.prototype.getMedicationNote = function () {
        return this.storage.get('medication_note').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setSupplementNote = function (supplementNote) {
        this.storage.set('supplement_note', supplementNote);
    };
    ;
    ProgressData.prototype.getSupplementNote = function () {
        return this.storage.get('supplement_note').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.setDietNote = function (dietNote) {
        this.storage.set('diet_note', dietNote);
    };
    ;
    ProgressData.prototype.getDietNote = function () {
        return this.storage.get('diet_note').then(function (value) {
            return value;
        });
    };
    ;
    ProgressData.prototype.getProgressJsonData = function () {
        var _this = this;
        var progressData = "{";
        return this.storage.get('is_left_hand').then(function (value) {
            progressData += 'is_left_hand :' + value + ',';
            return _this.storage.get('test_datetime').then(function (value) {
                progressData += 'test_datetime :"' + value + '",';
                return _this.storage.get('track_data').then(function (value) {
                    progressData += 'track_data :' + value + ',';
                    return _this.storage.get('speedtest_result').then(function (value) {
                        progressData += 'speedtest_result :' + value + ',';
                        return _this.storage.get('general_note').then(function (value) {
                            progressData += 'general_note :"' + value + '",';
                            return _this.storage.get('lower_sleep_hour').then(function (value) {
                                progressData += 'lower_sleep_hour :' + value + ',';
                                return _this.storage.get('upper_sleep_hour').then(function (value) {
                                    progressData += 'upper_sleep_hour :' + value + ',';
                                    return _this.storage.get('stress_level').then(function (value) {
                                        progressData += 'stress_level :' + value + ',';
                                        return _this.storage.get('medication_note').then(function (value) {
                                            progressData += 'medication_note : "' + value + '",';
                                            return _this.storage.get('supplement_note').then(function (value) {
                                                progressData += 'supplement_note : "' + value + '",';
                                                return _this.storage.get('diet_note').then(function (value) {
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
    };
    return ProgressData;
}());
ProgressData = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], ProgressData);

//# sourceMappingURL=progressdata.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrawPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__speedexam_speedexam__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_canvas_draw_canvas_draw__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DrawPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DrawPage = (function () {
    function DrawPage(navCtrl, navParams, progressData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.progressData = progressData;
        this.speedtestPage = __WEBPACK_IMPORTED_MODULE_2__speedexam_speedexam__["a" /* SpeedexamPage */];
    }
    // hide gotonediv
    DrawPage.prototype.closeOne = function (event) {
        var overlay = document.getElementById('gotonediv');
        overlay.classList.add('closed');
        localStorage.setItem('closeOne', 'closed-yes');
    };
    DrawPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DrawPage');
        this.canvasDraw.resetTrack(false);
        //alert();
    };
    DrawPage.prototype.onRedrawTapped = function () {
        this.canvasDraw.resetTrack(false);
    };
    DrawPage.prototype.onNextTapped = function () {
        this.progressData.setTrackData(JSON.stringify(this.canvasDraw.track));
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__speedexam_speedexam__["a" /* SpeedexamPage */]);
    };
    DrawPage.prototype.onBackTapped = function () {
        this.navCtrl.pop();
    };
    return DrawPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__components_canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__components_canvas_draw_canvas_draw__["a" /* CanvasDrawComponent */])
], DrawPage.prototype, "canvasDraw", void 0);
DrawPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-draw',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/draw/draw.html"*/'\n<ion-nav id="nav" #rootNavController [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<ion-content no-bounce> \n\n  <div id="gotonediv" class="gotonediv">\n    <!-- <div class="top">\n      <div class="circle"><img class="start" width="96" height="17" src="assets/img/3_starthere.svg"/></div>\n    </div>\n    <div class="bottom">\n      <div class="circle"><img class="finish" src="assets/img/3_finishhere.svg"/></div>\n    </div> -->\n    <div class="middle">\n      <h2>Begin by following the path using<br>either your finger or a stylus</h2>\n      <p>Try your best to stay within the path and<br>maintain a smooth, consistent movement.</p>\n      <a href="#" id="gotonebtn" class="btn btn-large" (click)="closeOne()">Got it</a>\n    </div>\n  </div>\n\n  <div class="actions-top">\n    <a href="#" class="top-link left" (click)="onBackTapped()">Back</a>\n  </div>\n\n  <div class="draw-cont">\n    <canvas-draw></canvas-draw>\n  </div>\n\n  <div class="actions">\n    <a href="#" class="btn btn-grey left" (click)="onRedrawTapped()">Redraw</a>\n    <a href="#" class="btn right" (click)="onNextTapped()">Next</a>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/draw/draw.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__["a" /* ProgressData */]])
], DrawPage);

// don't show gotonediv again
var closeOne = localStorage.getItem('closeOne') || '';
if (closeOne == 'closed-yes') {
    document.body.classList.add('seenOneBefore');
    //localStorage.removeItem('closeOne');
}
//# sourceMappingURL=draw.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__draw_draw__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { SinglenotesPage } from '../singlenotes/singlenotes';

//import { LandingPage } from '../landing/landing';
var HomePage = (function () {
    function HomePage(navCtrl, progressData) {
        this.navCtrl = navCtrl;
        this.progressData = progressData;
    }
    HomePage.prototype.onLeftHandTapped = function () {
        this.progressData.setIsLeftHand(1);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__draw_draw__["a" /* DrawPage */]);
        //this.navCtrl.push(LandingPage);
    };
    HomePage.prototype.onRightHandTapped = function () {
        this.progressData.setIsLeftHand(0);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__draw_draw__["a" /* DrawPage */]);
        //this.navCtrl.push( DrawPage );
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/home/home.html"*/'\n<ion-nav id="nav" #rootNavController [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<ion-content no-bounce>    \n  <div class="hm-center">\n    <img class="logo" src="assets/img/logo.svg"/>\n    <div class="hm-slides">\n      <ion-slides pager>\n        <ion-slide no-padding>\n          <h1>Record change</h1>\n          <p>Record your progress and track<br>\n          changes on a day to day basis by<br>\n          measuring hand coordination.</p>   \n        </ion-slide>\n        <ion-slide>\n          <h1>Just 30 seconds</h1>\n          <p>A hassle free solution making<br>each recording quick and easy.<br>\n          Get in and get out.</p>\n        </ion-slide>\n        <ion-slide>\n          <h1>See for yourself</h1>\n          <p>Identify possible reasons for the<br>\n          fluctuation of your symptoms.<br>\n          Share the results with your specialist.</p>                 \n        </ion-slide>\n      </ion-slides>\n    </div> \n  </div>\n    \n  <div class="hm-actions">\n    <a class="link" href="http://progressrecorderapp.com/">progressrecorderapp.com</a>\n    <a class="first-hand hand" href="#" (click)="onLeftHandTapped()"><img src="assets/img/1_lefthand.svg"/>Left hand</a>\n    <a class="hand" href="#" (click)="onRightHandTapped()"><img src="assets/img/1_righthand.svg"/>Right hand</a>\n  </div>\n\n  <div class="bg"></div>\n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/WhiteBunny/progressrecorder_mobile/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_progressdata__["a" /* ProgressData */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map