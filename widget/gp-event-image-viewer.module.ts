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
import { NgModule } from '@angular/core';
import { HOOK_COMPONENTS, CoreModule } from '@c8y/ngx-components';
import { GpEventImageViewerComponent, ImageViewerDialog } from './gp-event-image-viewer.component';
import { GpEventImageViewerConfigComponent } from './gp-event-image-viewer.config';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselImageViewer } from './carousel-image-viewer';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import{ CollapseModule } from 'ngx-bootstrap/collapse';
@NgModule({
  declarations: [GpEventImageViewerComponent, GpEventImageViewerConfigComponent, CarouselImageViewer, ImageViewerDialog],
  imports: [
    CoreModule,
    ReactiveFormsModule,
    MatIconModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    CarouselModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [GpEventImageViewerComponent, GpEventImageViewerConfigComponent],
  entryComponents: [GpEventImageViewerComponent, GpEventImageViewerConfigComponent, ImageViewerDialog, CarouselImageViewer],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
          id: 's3-image-viewer-widget',
          label: 'Event Image Viewer',
          description: 'Event Image Viewer',
          component: GpEventImageViewerComponent,
          configComponent: GpEventImageViewerConfigComponent,
          data: {
              ng1: {
                  options: {
                  noDeviceTarget: false,
                  noNewWidgets: false,
                  deviceTargetNotRequired: false,
                  groupsSelectable: true
                  }
              }
          }
        }
    }]
})
export class GpEventImageViewerModule { }
