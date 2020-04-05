import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OglasDetailsPage } from './oglas-details.page';

const routes: Routes = [
  {
    path: '',
    component: OglasDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OglasDetailsPageRoutingModule {}
