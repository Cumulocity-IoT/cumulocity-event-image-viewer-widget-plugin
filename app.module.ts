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

import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as ngRouterModule } from "@angular/router";
import {
  BootstrapComponent,
  CoreModule,
  RouterModule,
} from "@c8y/ngx-components";
import { CockpitDashboardModule } from "@c8y/ngx-components/context-dashboard";
import { BsModalRef, BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { GpEventImageViewerModule } from "./widget/gp-event-image-viewer.module";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot([], { enableTracing: false, useHash: true }),
    RouterModule.forRoot(),
    CoreModule.forRoot(),
    GpEventImageViewerModule,
    CockpitDashboardModule,
  ],
  providers: [
    BsModalService,
    ModalModule,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { 
      provide: MAT_DIALOG_DATA, 
      useValue: {} 
    }
  ],
  bootstrap: [BootstrapComponent],
})
export class AppModule {}
