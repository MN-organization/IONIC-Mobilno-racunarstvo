import { Component, OnInit } from '@angular/core';
import {OglasiService} from './oglasi.service';
import {OglasModel} from '../modeli/oglas.model';

@Component({
  selector: 'app-oglasi',
  templateUrl: './oglasi.page.html',
  styleUrls: ['./oglasi.page.scss'],
})
export class OglasiPage implements OnInit {

  oglasi: OglasModel[] = [];

  constructor(private oglasiService: OglasiService) { }

  ngOnInit() {
    // this.oglasiService.oglasiPromena.subscribe(oglasi => {
    //   this.oglasi = oglasi;
    // });

     this.oglasi = this.oglasiService.getAllOglasi();
  }

}
