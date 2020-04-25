import {Component, OnDestroy, OnInit} from '@angular/core';
import {OglasiService} from './oglasi.service';
import {OglasModel} from '../modeli/oglas.model';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-oglasi',
    templateUrl: './oglasi.page.html',
    styleUrls: ['./oglasi.page.scss'],
})
export class OglasiPage implements OnInit, OnDestroy {

    oglasi: OglasModel[] = [];

    promena: Subscription;

    isMojiOglasi = false;

    naslov: string;

    pocetna = false;

    constructor(private oglasiService: OglasiService,
                private route: Router) {
    }

    ngOnInit() {
        this.promena = this.oglasiService.promena
            .subscribe(lista => {
                console.log(lista);
                this.oglasi = lista;
            });
    }

    ionViewWillEnter() {
        if (this.route.url === '/oglasi') {
            this.oglasiService.getAllOglasi();
            this.naslov = 'Prodaja automobila MN - oglasi';
            this.pocetna = true;
        } else if (this.route.url === '/moji_oglasi') {
            this.isMojiOglasi = true;
            this.oglasiService.getMojiOglasi();
            this.naslov = 'Moji oglasi';
        } else if (this.route.url === '/rezultati_pretrage'){
            this.naslov = 'Rezultati pretrage';
        } else {
            this.oglasiService.getSacuvaniOglasi();
            this.naslov = 'Sacuvani oglasi';
        }
    }

    ngOnDestroy(): void {
        if (this.promena) {
            this.promena.unsubscribe();
        }
    }


}
