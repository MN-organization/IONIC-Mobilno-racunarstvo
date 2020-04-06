import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {OglasModel} from '../../modeli/oglas.model';
import {OglasiService} from '../oglasi.service';

@Component({
  selector: 'app-dodaj-oglas',
  templateUrl: './dodaj-oglas.page.html',
  styleUrls: ['./dodaj-oglas.page.scss'],
})
export class DodajOglasPage implements OnInit {

  constructor(private oglasiService: OglasiService) {
  }

  @ViewChild('f', { static: false }) signupForm: NgForm;

  oglas: OglasModel = {
    id: 0,
    naslov: '',
    opis: '',
    cena: 0,
    vrstaGoriva: '',
    godiste: 0,
    kubikaza: 0,
    kilometraza: 0,
    slika: [],
    marka: '',
    menjac: '',
    model: '',
    snaga: 0
  };

  menjaci = ['Manuelni', 'Automatski'];

  godista: number[] = [];

  gorivo = ['benzin', 'dizel', 'tng'];

  marke = [
    {naziv: 'Toyota'},
    {naziv: 'Mitsubishi'},
    {naziv: 'VW'},
    {naziv: 'Passat'}
  ];

  onSubmit() {
    this.oglas.snaga = this.signupForm.value.ks;
    this.oglas.vrstaGoriva = this.signupForm.value.gorivo;
    this.oglas.slika[0] = this.signupForm.value.slika;
    this.oglas.menjac = this.signupForm.value.menjac;
    this.oglas.godiste = this.signupForm.value.godiste;
    this.oglas.kubikaza = this.signupForm.value.ccm;
    this.oglas.kilometraza = this.signupForm.value.km;
    this.oglas.cena = this.signupForm.value.cena;
    this.oglas.model = this.signupForm.value.model;
    this.oglas.marka = this.signupForm.value.marka;
    this.oglas.opis = this.signupForm.value.opis;
    this.oglas.naslov = this.signupForm.value.naslov;

    console.log(this.oglas);

    this.oglasiService.addOglas(this.oglas);

    this.signupForm.reset();
  }

  ngOnInit(): void {
    const godina = new Date().getFullYear();
    for (let i = godina; i > 1913; i--) {
      this.godista.push(i);
    }
  }

}
