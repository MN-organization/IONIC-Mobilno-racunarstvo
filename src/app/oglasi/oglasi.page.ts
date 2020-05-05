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

    promena: Subscription;

    isMojiOglasi = false;

    naslov: string;

    pocetna = false;

    isLoading = false;

    isloadingSub: Subscription;

    constructor(private oglasiService: OglasiService,
                private route: Router) {
    }

    ngOnInit() {
        this.isloadingSub = this.oglasiService.isLoadingSubject.subscribe(bul => {
            this.isLoading = bul;
        });
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
        } else if (this.route.url === '/rezultati_pretrage') {
            this.naslov = 'Rezultati pretrage';
            console.log('stari rezultati');
            this.oglasi = this.oglasiService.listaOglasaPretraga;
            setTimeout(() => {
                this.isLoading = false;
            }, 500);//ako za 500ms ne stignu novi rezultati pretrage,prikaze stare
        } else {
            this.oglasiService.getSacuvaniOglasi();
            this.naslov = 'Sacuvani oglasi';
        }
    }

    ngOnDestroy(): void {
        if (this.promena) {
            this.promena.unsubscribe();
        }
        if (this.isloadingSub) {
            this.isloadingSub.unsubscribe();
        }
    }


}
