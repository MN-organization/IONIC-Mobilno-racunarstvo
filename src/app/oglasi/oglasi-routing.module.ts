import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OglasiPage } from './oglasi.page';

const routes: Routes = [
  {
    path: '',
    component: OglasiPage
  },
  {
    path: ':id',
    loadChildren: () => import('./oglas-details/oglas-details.module').then( m => m.OglasDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OglasiPageRoutingModule {}
