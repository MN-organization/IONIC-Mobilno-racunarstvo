import { Injectable } from '@angular/core';
import {OglasModel} from '../modeli/oglas.model';

@Injectable({
  providedIn: 'root'
})
export class OglasiService {

  listaOglasa: OglasModel[] = [
    {
      id: 0,
      naslov: 'Mitsubishi Colt 1.3 NOV NOV CH',
      opis: 'Prvi vlasnik, vozen do fakulteta, ko casa',
      cena: 1500,
      marka: 'Mitsubishi',
      model: 'Colt',
      godiste: 1997,
      kilometraza: 280000,
      vrstaGoriva: 'Benzin',
      snaga: 75,
      kubikaza: 1299,
      menjac: 'DSG',
      slika: [
        'https://static.cargurus.com/images/site/2008/06/20/19/52/1997_mitsubishi_colt-pic-47314-1600x1200.jpeg',
        'https://live.staticflickr.com/7897/33668483828_519380770a_b.jpg'
      ]
    },
    {
      id: 1,
      naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
      opis: 'Prvi vlasnik, nije vozen, ko casa',
      cena: 7000,
      marka: 'VW',
      model: 'Polo',
      godiste: 2011,
      kilometraza: 153560,
      vrstaGoriva: 'Dizel',
      snaga: 75,
      kubikaza: 1199,
      menjac: 'DSG',
      slika: [
        'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg',
        'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG'
      ]
    },
    {
      id: 2,
      naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
      opis: 'Prvi vlasnik, nije vozen, ko casa',
      cena: 7000,
      marka: 'VW',
      model: 'Polo',
      godiste: 2011,
      kilometraza: 153560,
      vrstaGoriva: 'Dizel',
      snaga: 75,
      kubikaza: 1199,
      menjac: 'DSG',
      slika: [
          'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG',
          'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg'
      ]
    },
    {
      id: 3,
      naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
      opis: 'Prvi vlasnik, nije vozen, ko casa',
      cena: 7000,
      marka: 'VW',
      model: 'Polo',
      godiste: 2011,
      kilometraza: 153560,
      vrstaGoriva: 'Dizel',
      snaga: 75,
      kubikaza: 1199,
      menjac: 'DSG',
      slika: [
        'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg',
        'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG'
      ]
    }

  ];

  constructor() { }

  getAllOglasi() {
    return this.listaOglasa;
  }

  getOglas(id: number) {
    return this.listaOglasa[id];
  }

  addOglas(oglas: OglasModel) {
    oglas.id = this.listaOglasa.length;
    this.listaOglasa.push(oglas);
  }

}
