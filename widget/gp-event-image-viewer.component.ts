/*
* Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
  Input,
} from '@angular/core';
import {
  // MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { GpEventImageViewerService } from './gp-event-image-viewer.service';
import { EventService, Realtime } from '@c8y/client';
import { DomSanitizer } from '@angular/platform-browser';
import * as DefaultImage from './gp-default-image';
import { CarouselImageViewer } from './carousel-image-viewer';
import { ElementArrayFinder } from 'protractor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'lib-gp-event-image-viewer',
  templateUrl: './gp-event-image-viewer.component.html',
  styleUrls: ['./gp-event-image-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GpEventImageViewerComponent implements OnInit {
  @Input() config;
  isLinear = false;
  panelOpenState = false;
  url = '';
  selectedIndex = 0;
  realtimeState = true;
  evantData = [];
  displayData = [];
  slideshow = false;
  noWrapSlides = false;
  firstCall = false;
  fromDate = '';
  toDate = '';
  imageMap = {};
  isCollapsed1 = false;
  isAnimated:boolean=false;
  constructor(
    // public dialog: MatDialog,
    private modalService: BsModalService,
    public events: EventService,
    public realtimeService: Realtime,
    public imageViewrService: GpEventImageViewerService,
    // tslint:disable-next-line: variable-name
    public _DomSanitizationService: DomSanitizer
  ) { }

  ngOnInit() {
    this.firstCall = true;
    if (!this.config) {
      const device = {
        id: '43084821'
      };
      this.config = {
          accessKeyId: '###',
          secretAccessKey: '###',
          signatureVersion: '##',
          region: '##',
          device,
          width: 500,
          height: 500,
          imgSrcType: 's3key',
          eventType: 'C8y_Image_Event',
          bucket: '###'
        };
    }
    this.refresh();
  }
  async refresh() {
    this.fromDate = '';
    this.toDate = '';
    this.imageViewrService.fetchS3(this.config);
    await this.fetchEvents();
  }
  errorInloading(event) {
    this.url = 'data:image/png;base64, ' + DefaultImage.defaultImage;
  }
  // fetches image from base url and AWS storage
  async loadImage() {
    this.url = '';
    if ( this.evantData.length > 0 && this.evantData[this.selectedIndex].Image !== undefined) {
      if (this.imageMap.hasOwnProperty(this.evantData[this.selectedIndex].id)) {
        this.url = this.imageMap[this.evantData[this.selectedIndex].id];
      } else {
        if (this.config.imgSrcType === 'baseUrl') {
          this.url = await this.fetchImg(
            this.config.baseUrl + this.evantData[this.selectedIndex].Image
          );
        } else {
          this.url = 'data:image/png;base64, '+this.evantData[this.selectedIndex].Image
          //this.url = this.imageViewrService.getImage(
          //  this.evantData[this.selectedIndex].Image
          //);
        }
        this.imageMap[this.evantData[this.selectedIndex].id] = this.url;
      }
    }
  }
  // to show the events in the slide show.It will open a slide show pop-up
  async setSlideShow() {
    this.slideshow = !this.slideshow;
    let data = {
      width: this.config.width + 'px',
      height: this.config.height + 'px',
      data: {
        eventData: this.evantData,
        baseUrl:
          this.config.imgSrcType === 'baseUrl' ? this.config.baseUrl : '',
        width: Number(this.config.width) - 100 + 'px',
        height: Number(this.config.height) - 100 + 'px',
      },
    };
    const dialogRef = this.setMapDialog(data);

    await dialogRef.content.event.subscribe(async result => {});
  }

  private setMapDialog(data: any): BsModalRef {
    return this.modalService.show(CarouselImageViewer, { class: 'modal-lg', initialState: { input: data }});
}

  // this retrieves the base url image
  async fetchImg(url) {
    await this.imageViewrService.fetchImageFromBaseUrl(url).then((response)=>response.json()).then((x)=>{
      this.url= 'data:image/png;base64, ' + x.encodedString;
    })
    return this.url;
  }
  // update 'from date' and 'to date' based on date selected
  dateChanged(x, event) {
    if (x === 'from') {
      this.fromDate = event.value;
    } else {
      this.toDate = event.value;
    }
  }
  // filters the event list based on selected dates
  filter() {
    this.displayData = this.evantData.filter((singleEvent) => {
      if ( singleEvent.creationTime !== undefined) {
        return (
          Date.parse(singleEvent.creationTime) > Date.parse(this.fromDate) &&
          Date.parse(singleEvent.creationTime) < Date.parse(this.toDate)
        );
      }
      return false;
    });
  }
  async openDialog(key): Promise<void> {
    // tslint:disable-next-line: no-use-before-declare
    let data={
      width: this.config.width + 'px',
      height: this.config.height + 'px',
      data: { url: this.url },
    };
    const dialogRef = this.showMapDialog(data);

    await dialogRef.content.event.subscribe(async result => {});
  }

  private showMapDialog(data: any): BsModalRef {
    return this.modalService.show(ImageViewerDialog, { class: 'modal-lg', initialState: {input: data}});
  }
  
  // fetches event list from event servcice
  async fetchEvents() {
        const eventFilter = {
      source: this.config.device.id,
      pageSize : 2000,
      type: this.config.eventType,
     };
        // tslint:disable-next-line: deprecation
       await this.events.list(eventFilter)
      .then((data) => {
        if (this.realtimeState) {
          this.evantData = data.data;
          if (this.evantData.length > 0) {
            this.evantData.sort((a, b): number => {
              if ( a.creationTime !== undefined && b.creationTime !== undefined) {
                return a.creationTime > b.creationTime
                ? -1
                : a.creationTime < b.creationTime
                ? 1
                : 0;
              }
              return 0;
            });
            this.displayData = this.evantData;
            this.displayData.forEach(element => {
              element.isCollapsed1 = true;
            })
            setTimeout(() => this.loadImage(), 2000);
          }
        }
      });
  }
  collapseLogic(eventID) {
    this.displayData.forEach(element => {
      if (element.id === eventID) {
        element.isCollapsed1 = !element.isCollapsed1;
      }
      else
      {
        element.isCollapsed1 = true;
      }
    })
  }
  toggle() {
    this.realtimeState = !this.realtimeState;
    if (this.realtimeState) {
      this.fetchEvents();
    }
  }
  // On selection of particular event it will show the image in the dialog
  stepperselectected(event) {
    this.url = '';
    this.selectedIndex = event.selectedIndex;
    this.loadImage();
  }
}

export interface DialogData {
  url: string;
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'image-viewer-dialog',
  templateUrl: 'image-viewer-dialog.html',
  styleUrls: ['image-viewer-dialog.css'],
})
// tslint:disable-next-line: component-class-suffix
export class ImageViewerDialog {

  input:any;

  constructor(public dialogRef: MatDialogRef<ImageViewerDialog>,public _DomSanitizationService: DomSanitizer
  ) {
    console.log(this.input);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

