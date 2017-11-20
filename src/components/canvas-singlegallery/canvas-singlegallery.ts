import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the CanvasDrawComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
interface Dot {
   x: number;
   y: number;
   in: boolean;
}

@Component({
  selector: 'canvas-singlegallery',
  templateUrl: 'canvas-singlegallery.html'
})

export class CanvasSinglegalleryComponent {

  @ViewChild('myCanvas') canvas: any;
  
  canvasElement: any; 
  brushSize: number = 10;
  progressId: number;
  track: Dot[]=[];
  
  constructor(public platform: Platform, public renderer: Renderer, public sqlite: SQLite) {    
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;    
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height()*0.8 + '');
  }

  drawEmpty() {
    let tempPlatform = this.platform;
    let tempCanvasElement = this.canvas.nativeElement;
    let ctx = tempCanvasElement.getContext('2d');
    ctx.clearRect(0, 0, tempPlatform.width(), tempPlatform.height()*0.8);
    ctx.font = "30px oswald";
    ctx.fillText('No Progress', tempPlatform.width()/2 - 75, tempPlatform.height()*0.4); 
  }

  drawProgress()
  {
    let tempThis = this;
    
    var imageTrack = new Image();
    let tempPlatform = this.platform;
    let tempCanvasElement = this.canvas.nativeElement;
    var offsetHeight;
    if( tempPlatform.width() <= 350) {
      offsetHeight = (tempPlatform.height()-40*2 - 381)/2; 
    } else {
      offsetHeight = (tempPlatform.height()-40*2  - 431)/2;
    }  
    imageTrack.onload = function() {      
      let ctx = tempCanvasElement.getContext('2d');    
      ctx.clearRect(0, 0, tempPlatform.width(), tempPlatform.height()*0.8);         
      if( tempPlatform.width() <= 350) {
        ctx.drawImage(imageTrack, 0, 0 , 524, 763, (tempPlatform.width() - 262)/2, offsetHeight, 262, 381); 
      } else {
        ctx.drawImage(imageTrack, 0,0 , 633, 863, (tempPlatform.width() - 317)/2, offsetHeight, 317, 431);
      }
    }
    if( tempPlatform.width() <= 350 ) {      
      imageTrack.src = 'assets/img/3_track_se.png';
    }else {
      imageTrack.src = 'assets/img/3_track.png';
    }
    this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {     
          db.transaction(function(tx) {
           
            tx.executeSql('SELECT * FROM progressData WHERE id='+tempThis.progressId, [], function(tx, rs) {   
              ////////////////////////////                           
              tempThis.track = JSON.parse(rs.rows.item(0).track_data);                
              tempThis.drawTrack();
            }, function(tx, error) {
              console.log('SELECT error: ' + error.message);
            });
          });
        })
        .catch(e => console.log(e));
    //console.log(this.track);
  }  

  
  drawTrack() {
    //alert();
    //console.log(this.track);
    for(var i=1;i<this.track.length;i++) {
      this.drawLine(this.track[i-1].x, this.track[i-1].y,this.track[i].x, this.track[i].y,this.track[i].in);
    }
  }

  drawLine(startX: number, startY: number, endX: number, endY: number, isIn: boolean)
  { 
    //alert();
    let ctx = this.canvasElement.getContext('2d');
    if(startX >= 0 && endX >= 0) {
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.closePath();
    }
        
    if(!isIn) {
      ctx.strokeStyle = '#ff004c';
    } else {
      ctx.strokeStyle = '#0f70e7';
    }
    if(startX >= 0 && endX >= 0) {
      ctx.linewidth = this.brushSize;    
      ctx.stroke();
    }
  }
}