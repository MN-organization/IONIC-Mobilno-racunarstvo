import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MarkaModelService {

    marke = [
        {naziv: 'Toyota', model: ['Auris', 'Yaris', 'Corolla', 'Rav 4']},
        {naziv: 'Mitsubishi', model: ['Colt', 'Lancer', 'Pajero']},
        {naziv: 'VW', model: ['Polo', 'Passat', 'Golf']},
        {naziv: 'Opel', model: ['Astra', 'Insignia', 'Corsa']}
    ];

    constructor() {
    }

    getAll() {
        return this.marke;
    }

}
