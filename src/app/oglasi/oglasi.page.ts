import {Component, OnDestroy, OnInit} from '@angular/core';
import {OglasiService} from './oglasi.service';
import {OglasModel} from '../modeli/oglas.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-oglasi',
    templateUrl: './oglasi.page.html',
    styleUrls: ['./oglasi.page.scss'],
})
export class OglasiPage implements OnInit, OnDestroy {

    oglasi: OglasModel[] = [];

    promenaRez: Subscription;

    constructor(private oglasiService: OglasiService, private route: Router) {
    }

    ngOnInit() {
        console.log('otvoren oglasi komp');
        if (this.route.url === '/oglasi') {
            this.oglasi = this.oglasiService.getAllOglasi();
        } else {
            console.log('otvoreni rezultati pretrage');
            this.promenaRez = this.oglasiService.promenaRezultataPretrage.subscribe((lista) => this.oglasi = lista);
            console.log(this.oglasiService.listaOglasaPretraga.length);
        }
    }

    ngOnDestroy(): void {
        if(this.promenaRez)
        this.promenaRez.unsubscribe();
    }

}
