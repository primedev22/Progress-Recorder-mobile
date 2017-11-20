import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';

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
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})

export class CanvasDrawComponent {

  @ViewChild('myCanvas') canvas: any;
  
  canvasElement: any;
  lastX: number;
  lastY: number;  
  offsetY: number;
  
  brushSize: number = 10;
  flag: number = 0;
  startingPosX: number;
  startingPosY: number;
  endingPosX: number;
  endingPosY: number;
  track: Dot[]=[];
 
  myTimer : any;

  constructor(public platform: Platform, public renderer: Renderer) {    
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;   
    
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height()*0.8 + '');
    this.offsetY = 40;     
    this.flag = 0;
    
  }

  resetTrack(isTracking: boolean)
  {
    var imageTrack = new Image();
    let tempThis = this;
    let tempPlatform = this.platform;
    let tempCanvasElement = this.canvas.nativeElement;
    let ctx = tempCanvasElement.getContext('2d'); 
    var offsetHeight;

    if( tempPlatform.width() <= 350) {
      offsetHeight = (tempPlatform.height()-this.offsetY*2 - 381)/2; 
    } else {
      offsetHeight = (tempPlatform.height()-this.offsetY*2  - 431)/2;
    }  
    
    imageTrack.onload = function() {      
      ctx.clearRect(0, 0, tempPlatform.width(), tempPlatform.height()*0.8);         
      if( tempPlatform.width() <= 350) {
        ctx.drawImage(imageTrack, 0, 0 , 524, 763, (tempPlatform.width() - 262)/2, offsetHeight, 262, 381); 
      } else {
        ctx.drawImage(imageTrack, 0,0 , 633, 863, (tempPlatform.width() - 317)/2, offsetHeight, 317, 431);
        console.log(tempPlatform.width());
      }
      if( !isTracking )  {
        let startingPosCenterX;
        let startingPosCenterY;
        if(tempPlatform.width() <= 350) {
          startingPosCenterX = tempThis.startingPosX = (tempPlatform.width() - 262)/2+16;
          startingPosCenterY = tempThis.startingPosY = offsetHeight + 16;
        }else {
          startingPosCenterX = tempThis.startingPosX = (tempPlatform.width() - 317)/2+16;
          startingPosCenterY = tempThis.startingPosY = offsetHeight + 16;
        }
        
        var imageStart = new Image();
        
        imageStart.onload = function() {        
          //alert(startingPosCenterX);     
          ctx.drawImage( imageStart, startingPosCenterX - 16, startingPosCenterY - 16, 31,31);
          //ctx.drawImage( this, 100, 100);
          //alert();
        }
        imageStart.src = 'assets/img/3_start.png';
        
        tempThis.flag = 0;
        tempThis.track = [];      
      }
      if(tempPlatform.width() <= 350 ) {
        tempThis.endingPosX = (tempPlatform.width() - 262)/2+17;
        tempThis.endingPosY = offsetHeight + 382 - 16;
      }else {
        tempThis.endingPosX = tempPlatform.width()/2 + 158 -16;
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
    }
    if( tempPlatform.width() <= 350 ) {      
      imageTrack.src = 'assets/img/3_track_se.png';
    }else {
      imageTrack.src = 'assets/img/3_track.png';
    }
  }

  handleStart(ev) {

    if(this.flag == 0) {
      if( (this.startingPosX-ev.touches[0].pageX)*(this.startingPosX-ev.touches[0].pageX)
        +(this.startingPosY-ev.touches[0].pageY+this.offsetY)*(this.startingPosY-ev.touches[0].pageY+this.offsetY)<=25*25)
      {        
        this.flag = 1;
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY - this.offsetY; 
        this.track.push({x: this.lastX, y: this.lastY, in: true});
        this.resetTrack( true );
      }
    }else if(this.flag == 1) {
      console.log("kill timer");
      clearInterval(this.myTimer);
      /*if(this.timerId > 0){
        clearInterval(this.timerId);
        alert("kill timer");
      } */

      let currentX = ev.touches[0].pageX;
      let currentY = ev.touches[0].pageY - this.offsetY;

      if(!( (this.endingPosX-currentX)*(this.endingPosX-currentX)
        +(this.endingPosY-currentY)*(this.endingPosY-currentY)<=15.5*15.5)
      && ( (this.endingPosX-this.lastX)*(this.endingPosX-this.lastX)
        +(this.endingPosY-this.lastY)*(this.endingPosY-this.lastY)<=15.5*15.5))
      {
        this.flag = 2;
      }else {
        this.drawLine(this.lastX, this.lastY, currentX, currentY);
        this.lastX = currentX;
        this.lastY = currentY;
      }

    }
  }

  handleMove(ev) {    
  //  console.log(this.flag);
    if(this.flag == 1) {
      
      let currentX = ev.touches[0].pageX;
      let currentY = ev.touches[0].pageY - this.offsetY;

      if(!( (this.endingPosX-currentX)*(this.endingPosX-currentX)
        +(this.endingPosY-currentY)*(this.endingPosY-currentY)<=15.5*15.5)
      && ( (this.endingPosX-this.lastX)*(this.endingPosX-this.lastX)
        +(this.endingPosY-this.lastY)*(this.endingPosY-this.lastY)<=15.5*15.5))
      {
        this.flag = 2;
      }else {
        this.drawLine(this.lastX, this.lastY, currentX, currentY);
        this.lastX = currentX;
        this.lastY = currentY;
      }
    }
  }
  
  handleEnd(ev) {
    //console.log('end');
    //console.log(this.flag);
    let tempThis = this;
    if(this.flag == 1) {
      //alert(tempThis.timerId);
      console.log("handle end");
      console.log(ev);
      //let currentX = ev.touches[0].pageX;
      //let currentY = ev.touches[0].pageY - this.offsetY;
      this.drawLine(this.lastX, this.lastY, -1,-1);
      this.lastX = -1;
      this.lastY = -1;
      tempThis.myTimer = setInterval( function(){
        tempThis.flag = 2;
        console.log(tempThis.track);
        clearInterval( tempThis.myTimer );
      }, 2000);
    }
  }

  drawLine(startX, startY, endX, endY)
  {    
    
    let ctx = this.canvasElement.getContext('2d');
    if(startX >= 0 && endX >= 0) {
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.closePath();
    }
    var p = ctx.getImageData(endX, endY, 1, 1).data;
//    console.log(p);
    
        
    if(p[0] == 0 && p[1] == 0 && p[2] ==0 || p[0] == 255) {
      ctx.strokeStyle = '#ff004c';
      this.track.push({x: endX, y: endY, in: false});
    } else {
      ctx.strokeStyle = '#0f70e7';
      this.track.push({x: endX, y: endY, in: true});
    }
    if(startX >= 0 && endX >= 0) {
      ctx.linewidth = this.brushSize;    
      ctx.stroke();
    }
  }
}
