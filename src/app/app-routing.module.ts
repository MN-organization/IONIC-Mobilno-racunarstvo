import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {OglasiResolverService} from './oglasi/resolver/oglasi-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'oglasi', pathMatch: 'full' },
  {
    path: 'oglasi', resolve: {
      oglasi: OglasiResolverService
    },
    loadChildren: () => import('./oglasi/oglasi.module').then( m => m.OglasiPageModule)
  }, {
    path: 'rezultati_pretrage',
    loadChildren: () => import('./oglasi/oglasi.module').then( m => m.OglasiPageModule)
  },  {
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
