import {Injectable} from '@angular/core';
import {OglasModel} from '../modeli/oglas.model';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class OglasiService {

    listaOglasa: OglasModel[] = [];

    listaOglasaPretraga: OglasModel[] = [];

    promena = new Subject<OglasModel[]>();

    constructor(private http: HttpClient) {
    }

    getMojiOglasi() {
        this.http.get<{ oglasi: OglasModel[], poruka: string }>('http://localhost:3000/moji_oglasi')
            .subscribe(podaci => {
                this.promena.next(podaci.oglasi);
            });
    }

    getAllOglasi() {
        this.http.get<{ oglasi: OglasModel[], poruka: string }>('http://localhost:3000/oglasi')
            .subscribe(res => {
                this.promena.next(res.oglasi);
            });
    }


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
            gorivo: oglas.gorivo,
            snaga: oglas.snaga,
            kubikaza: oglas.kubikaza,
            menjac: oglas.menjac,
            slika: oglas.slika
        }).subscribe((podaci) => {
            this.listaOglasa.push(podaci.oglas);

        });
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
        return this.http.get<{ oglas: OglasModel[], poruka: string }>('http://localhost:3000/oglasi/pretraga', {params}).subscribe(
            (response) => {
                console.log(response);
                this.listaOglasaPretraga = response.oglas;
                this.promena.next(this.listaOglasaPretraga);
            }
        );
    }

    delete(oglasId: string) {
        this.http.delete('http://localhost:3000/oglasi/' + oglasId)
            .subscribe(poruka => {
                console.log('deleted');
                this.getMojiOglasi();
            });
    }

    updateOglas(oglas: OglasModel) {
        this.http.put('http://localhost:3000/oglasi/' + oglas._id, oglas)
            .subscribe(podaci => {
                console.log(podaci);
            });
    }

    getSacuvaniOglasi() {
        this.http.get<{ oglasi: OglasModel[], poruka: string }>('http://localhost:3000/sacuvani_oglasi')
            .subscribe(podaci => {
                podaci.oglasi.forEach(og => {
                    og.sacuvan = true;
                });
                this.promena.next(podaci.oglasi);
            });
    }

    sacuvajOglas(idOglas: string) {
        console.log(idOglas);
        this.http.put<{ poruka: string }>('http://localhost:3000/sacuvani_oglasi', {oglasID: idOglas})
            .subscribe(podaci => {
                console.log(podaci);
            });
    }


    izbrisiSacuvanOglas(_id: string) {
        this.http.put<{ poruka: string }>('http://localhost:3000/sacuvani_oglasi_delete', {oglasID: _id})
            .subscribe(podaci => {
                console.log(podaci);
                // this.getSacuvaniOglasi();
            });
    }
}
