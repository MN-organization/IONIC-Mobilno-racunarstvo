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

    constructor(private oglasiService: OglasiService,
                private route: Router) {
    }

    ngOnInit() {
        this.promena = this.oglasiService.promena
            .subscribe(lista => {
               this.oglasi = lista;
            });
    }

    ionViewWillEnter() {
        if (this.route.url === '/oglasi') {
            this.oglasiService.getAllOglasi();
        } else if (this.route.url === '/moji_oglasi') {
            this.isMojiOglasi = true;
            this.oglasiService.getMojiOglasi();
        }
    }

    ngOnDestroy(): void {
        if (this.promena) {
            this.promena.unsubscribe();
        }
    }

}
