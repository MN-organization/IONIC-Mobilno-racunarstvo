import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OglasDetailsPageRoutingModule } from './oglas-details-routing.module';

import { OglasDetailsPage } from './oglas-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OglasDetailsPageRoutingModule
  ],
  declarations: [OglasDetailsPage]
})
export class OglasDetailsPageModule {}
