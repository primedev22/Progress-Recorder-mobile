import { NgModule } from '@angular/core';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw';


import { CanvasSinglegalleryComponent } from './canvas-singlegallery/canvas-singlegallery';
@NgModule({
	declarations: [CanvasDrawComponent,
    CanvasSinglegalleryComponent],
	imports: [],
	exports: [CanvasDrawComponent,
    CanvasSinglegalleryComponent]
})
export class ComponentsModule {}
