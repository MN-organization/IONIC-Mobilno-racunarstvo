import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DodajOglasPageRoutingModule } from './dodaj-oglas-routing.module';

import { DodajOglasPage } from './dodaj-oglas.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DodajOglasPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [DodajOglasPage]
})
export class DodajOglasPageModule {}
