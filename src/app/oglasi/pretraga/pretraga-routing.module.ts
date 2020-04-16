import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PretragaPage } from './pretraga.page';

const routes: Routes = [
  {
    path: '',
    component: PretragaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PretragaPageRoutingModule {}
