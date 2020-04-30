import {Injectable} from '@angular/core';
import {OglasModel} from '../modeli/oglas.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {BackendConst} from '../backend-const';

@Injectable({
    providedIn: 'root'
})
export class OglasiService {

    listaOglasa: OglasModel[] = [];

    listaOglasaPretraga: OglasModel[] = [];

    listaSacuvanih: OglasModel[] = [];

    promena = new Subject<OglasModel[]>();

    isLoadingSubject = new Subject<boolean>();

    constructor(private http: HttpClient) {
    }

    getMojiOglasi() {
        this.isLoadingSubject.next(true);
        this.http.get<{ oglasi: OglasModel[], poruka: string }>(BackendConst.backendAddress + '/moji_oglasi')
            .subscribe(podaci => {
                this.isLoadingSubject.next(false);
                this.promena.next(podaci.oglasi);
            });
    }

    getAllOglasi() {
        this.isLoadingSubject.next(true);
        this.http.get<{ oglasi: OglasModel[], poruka: string }>(BackendConst.backendAddress + '/oglasi')
            .subscribe(res => {
                this.promena.next(res.oglasi);
                this.isLoadingSubject.next(false);
            });
    }


    getOglas(id: string) {
        this.isLoadingSubject.next(true);
        return this.http.get<{ oglas: OglasModel, poruka: string }>(BackendConst.backendAddress + '/oglasi/' + id).pipe(
            map(res => {
                return res.oglas;
                this.isLoadingSubject.next(false);
            })
        );
    }

    addOglas(oglas: OglasModel) {
        this.http.post<{ oglas: OglasModel, poruka: string }>(BackendConst.backendAddress + '/oglasi/novi', {
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
        this.isLoadingSubject.next(true);
        return this.http.get<{ oglas: OglasModel[], poruka: string }>(BackendConst.backendAddress + '/oglasi/pretraga', {params}).subscribe(
            (response) => {
                console.log(response);
                this.isLoadingSubject.next(false);
                this.listaOglasaPretraga = response.oglas;
                this.promena.next(this.listaOglasaPretraga);
            }
        );
    }

    delete(oglasId: string) {
        this.http.delete(BackendConst.backendAddress + '/oglasi/' + oglasId)
            .subscribe(poruka => {
                console.log('deleted');
                this.getMojiOglasi();
            });
    }

    updateOglas(oglas: OglasModel) {
        this.http.put(BackendConst.backendAddress + '/oglasi/' + oglas._id, oglas)
            .subscribe(podaci => {
                console.log(podaci);
            });
    }

    getSacuvaniOglasi() {
        this.isLoadingSubject.next(true);
        this.http.get<{ oglasi: OglasModel[], poruka: string }>(BackendConst.backendAddress + '/sacuvani_oglasi')
            .subscribe(podaci => {
                podaci.oglasi.forEach(og => {
                    og.sacuvan = true;
                });
                this.isLoadingSubject.next(false);
                this.listaSacuvanih = podaci.oglasi;
                this.promena.next(podaci.oglasi);
            });
    }

    sacuvajOglas(idOglas: string) {
        console.log(idOglas);
        this.http.put<{ poruka: string }>(BackendConst.backendAddress + '/sacuvani_oglasi', {oglasID: idOglas})
            .subscribe(podaci => {
                console.log(podaci);
            });
    }


    izbrisiSacuvanOglas(_id: string) {
        this.http.put<{ poruka: string }>(BackendConst.backendAddress + '/sacuvani_oglasi_delete', {oglasID: _id})
            .subscribe(podaci => {
                console.log(podaci);
                // this.getSacuvaniOglasi();
            });
    }

    izbaciSacuvani(id: string) {
        for (let i = 0; i < this.listaSacuvanih.length; i++) {
            if (this.listaSacuvanih[i]._id === id) {
                this.listaSacuvanih.splice(i, 1);
                this.promena.next(this.listaSacuvanih);
                return;
            }
        }
    }
}
