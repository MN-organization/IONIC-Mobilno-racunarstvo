import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MarkaModelService {

    marke = [
        {naziv: 'Toyota', model: ['Auris', 'Yaris', 'Corolla']},
        {naziv: 'Mitsubishi', model: ['Colt', 'Lancer', 'Pajero']},
        {naziv: 'VW', model: ['Polo', 'Passat', 'Golf']}
    ];

    constructor() {
    }

    getAll() {
        return this.marke;
    }

}
