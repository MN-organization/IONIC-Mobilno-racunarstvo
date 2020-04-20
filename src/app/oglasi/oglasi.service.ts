import {Injectable} from '@angular/core';
import {OglasModel} from '../modeli/oglas.model';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OglasiService {

    listaOglasa: OglasModel[] = [
        // {
        //   id: 0,
        //   naslov: 'Mitsubishi Colt 1.3 NOV NOV CH',
        //   opis: 'Prvi vlasnik, vozen do fakulteta, ko casa',
        //   cena: 1500,
        //   marka: 'Mitsubishi',
        //   model: 'Colt',
        //   godiste: 1997,
        //   kilometraza: 280000,
        //   vrstaGoriva: 'Benzin',
        //   snaga: 75,
        //   kubikaza: 1299,
        //   menjac: 'DSG',
        //   slika: [
        //     'https://static.cargurus.com/images/site/2008/06/20/19/52/1997_mitsubishi_colt-pic-47314-1600x1200.jpeg',
        //     'https://live.staticflickr.com/7897/33668483828_519380770a_b.jpg'
        //   ]
        // },
        // {
        //   id: 1,
        //   naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
        //   opis: 'Prvi vlasnik, nije vozen, ko casa',
        //   cena: 7000,
        //   marka: 'VW',
        //   model: 'Polo',
        //   godiste: 2011,
        //   kilometraza: 153560,
        //   vrstaGoriva: 'Dizel',
        //   snaga: 75,
        //   kubikaza: 1199,
        //   menjac: 'DSG',
        //   slika: [
        //     'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg',
        //     'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG'
        //   ]
        // },
        // {
        //   id: 2,
        //   naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
        //   opis: 'Prvi vlasnik, nije vozen, ko casa',
        //   cena: 7000,
        //   marka: 'VW',
        //   model: 'Polo',
        //   godiste: 2011,
        //   kilometraza: 153560,
        //   vrstaGoriva: 'Dizel',
        //   snaga: 75,
        //   kubikaza: 1199,
        //   menjac: 'DSG',
        //   slika: [
        //       'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG',
        //       'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg'
        //   ]
        // },
        // {
        //   id: 3,
        //   naslov: 'VW Polo 1.2 TDI FULL NAVI upaljac',
        //   opis: 'Prvi vlasnik, nije vozen, ko casa',
        //   cena: 7000,
        //   marka: 'VW',
        //   model: 'Polo',
        //   godiste: 2011,
        //   kilometraza: 153560,
        //   vrstaGoriva: 'Dizel',
        //   snaga: 75,
        //   kubikaza: 1199,
        //   menjac: 'DSG',
        //   slika: [
        //     'https://media.autoweek.nl/m/lqryf7hbb7xc_800.jpg',
        //     'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/VA8AAOSwUd9afXg9/$_86.JPG'
        //   ]
        // }

    ];

    // oglasiPromena = new Subject<OglasModel[]>();

    constructor(private http: HttpClient) {
    }

    getAllOglasi() {
        console.log('lista popunjena iz servisa');
        return this.listaOglasa;
    }

    // refreshOglasi(){
    //   console.log("usao resolver");
    //   return this.http.get<{oglasi: OglasModel[], poruka: string}>('http://localhost:3000/oglasi')
    //       .subscribe(podaci => {
    //         this.listaOglasa = podaci.oglasi;
    //   //       this.oglasiPromena.next(this.listaOglasa);
    //        });
    // }

    getOglas(id: string) {
        return this.http.get<{ oglas: OglasModel, poruka: string }>('http://localhost:3000/oglasi/' + id).pipe(
            map(res => {
                return res.oglas;
            })
        );
    }

    addOglas(oglas: OglasModel) {
        this.http.post<{ oglas: OglasModel, poruka: string }>('http://localhost:3000/oglasi/novi', {
            naslov: oglas.naslov,
            opis: oglas.opis,
            cena: oglas.cena,
            marka: oglas.marka,
            model: oglas.model,
            godiste: oglas.godiste,
            kilometraza: oglas.kilometraza,
            vrstaGoriva: oglas.vrstaGoriva,
            snaga: oglas.snaga,
            kubikaza: oglas.kubikaza,
            menjac: oglas.menjac,
            slika: oglas.slika
        }).subscribe((podaci) => {
            this.listaOglasa.push(podaci.oglas);

        });

        // oglas.id = this.listaOglasa.length;
        // this.listaOglasa.push(oglas);
    }


    pretrazi(forma: any) {
        let params = new HttpParams();
        if (forma.marka) {
            params = params.append('marka', forma.marka);
        }
        if (forma.model) {
            params = params.append('model', forma.model);
        }
        if (forma.gorivo) {
            params = params.append('gorivo', forma.gorivo);
        }
        if (forma.cenaOd) {
            params = params.append('cenaOd', forma.cenaOd);
        }
        if (forma.cenaDo) {
            params = params.append('cenaDo', forma.cenaDo);
        }
        if (forma.kmOd) {
            params = params.append('kmOd', forma.kmOd);
        }
        if (forma.kmDo) {
            params = params.append('kmDo', forma.kmDo);
        }
        if (forma.ccmOd) {
            params = params.append('ccmOd', forma.ccmOd);
        }
        if (forma.ccmDo) {
            params = params.append('ccmDo', forma.ccmDo);
        }
        if (forma.ksOd) {
            params = params.append('ksOd', forma.ksOd);
        }
        if (forma.ksDo) {
            params = params.append('ksDo', forma.ksDo);
        }
        if (forma.godOd) {
            params = params.append('godOd', forma.godOd);
        }
        if (forma.godDo) {
            params = params.append('godDo', forma.godDo);
        }
        if (forma.menjac) {
            params = params.append('menjac', forma.menjac);
        }
        return this.http.get<{ oglasi: OglasModel[], poruka: string }>('http://localhost:3000/oglasi/pretraga', {params}).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }
}
