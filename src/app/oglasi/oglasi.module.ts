import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OglasiPageRoutingModule } from './oglasi-routing.module';

import { OglasiPage } from './oglasi.page';
import {OglasElementComponent} from './oglas-element/oglas-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OglasiPageRoutingModule
  ],
    declarations: [OglasiPage, OglasElementComponent]
})
export class OglasiPageModule {}
