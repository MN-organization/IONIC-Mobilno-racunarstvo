import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './auth/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'oglasi', pathMatch: 'full' },
  {
    path: 'oglasi',
    loadChildren: () => import('./oglasi/oglasi.module').then( m => m.OglasiPageModule)
  }, {
    path: 'rezultati_pretrage',
    loadChildren: () => import('./oglasi/oglasi.module').then( m => m.OglasiPageModule)
  },  {
    path: 'moji_oglasi', canActivate: [AuthGuardService],
    loadChildren: () => import('./oglasi/oglasi.module').then( m => m.OglasiPageModule)
  }, {
    path: 'sacuvani_oglasi', canActivate: [AuthGuardService],
    loadChildren: () => import('./oglasi/oglasi.module').then( m => m.OglasiPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
