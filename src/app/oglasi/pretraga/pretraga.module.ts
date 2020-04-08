import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PretragaPageRoutingModule } from './pretraga-routing.module';

import { PretragaPage } from './pretraga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PretragaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PretragaPage]
})
export class PretragaPageModule {}
