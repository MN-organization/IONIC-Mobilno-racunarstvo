import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {OglasModel} from '../../modeli/oglas.model';
import {OglasiService} from '../oglasi.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OglasiResolverService implements Resolve<OglasModel[]> {
    constructor(private oglasiService: OglasiService, private http: HttpClient) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OglasModel[]> | Promise<OglasModel[]> | OglasModel[] {
        //return this.oglasiService.refreshOglasi();
        console.log('usao resolver');
        return this.http.get<{ oglasi: OglasModel[], poruka: string }>('http://localhost:3000/oglasi').pipe(
            map(res => {
                console.log(res.oglasi);
                this.oglasiService.listaOglasa = res.oglasi;
                return res.oglasi;
            }));
    }
}
