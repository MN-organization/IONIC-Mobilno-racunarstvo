import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {OglasModel} from '../../modeli/oglas.model';
import {OglasiService} from '../oglasi.service';
import {MarkaModelService} from '../marka-model.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-dodaj-oglas',
    templateUrl: './dodaj-oglas.page.html',
    styleUrls: ['./dodaj-oglas.page.scss'],
})
export class DodajOglasPage implements OnInit {

    constructor(private oglasiService: OglasiService, private markaModelService: MarkaModelService) {
    }

    @ViewChild('f', {static: false}) addForm: NgForm;

    izabran: string;

    oglas: OglasModel = {
        _id: '',
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

    marke = [];

    selectedMarke = [];

    onSubmit() {
        this.oglas.snaga = this.addForm.value.ks;
        this.oglas.vrstaGoriva = this.addForm.value.gorivo;
        this.oglas.slika[0] = this.addForm.value.slika;
        this.oglas.menjac = this.addForm.value.menjac;
        this.oglas.godiste = this.addForm.value.godiste;
        this.oglas.kubikaza = this.addForm.value.ccm;
        this.oglas.kilometraza = this.addForm.value.km;
        this.oglas.cena = this.addForm.value.cena;
        this.oglas.model = this.addForm.value.model;
        this.oglas.marka = this.addForm.value.marka;
        this.oglas.opis = this.addForm.value.opis;
        this.oglas.naslov = this.addForm.value.naslov;

        console.log(this.oglas);

        this.oglasiService.addOglas(this.oglas);

        this.addForm.reset();
    }

    ngOnInit(): void {
        const godina = new Date().getFullYear();
        for (let i = godina; i > 1913; i--) {
            this.godista.push(i);
        }
        this.marke = this.markaModelService.getAll();

    }

    onSelektovanaMarka(e) {
        this.addForm.controls.model.reset();
        this.izabran = e.detail.value;
        for (const m of this.marke) {
            if (m.naziv === this.izabran) {
                this.selectedMarke = m.model;
            }
        }
    }


}
