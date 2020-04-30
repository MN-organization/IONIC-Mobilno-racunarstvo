import {Component, Input, OnInit} from '@angular/core';
import {OglasModel} from '../../modeli/oglas.model';
import {OglasiService} from '../oglasi.service';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-oglas-element',
    templateUrl: './oglas-element.component.html',
    styleUrls: ['./oglas-element.component.scss'],
})
export class OglasElementComponent implements OnInit {

    @Input() public oglas: OglasModel;

    @Input() isMyOglas;

    isSacuvan = false;

    constructor(private oglasiService: OglasiService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isSacuvan = this.oglas.sacuvan;
    }

    onEdit(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    onDelete(e) {
        e.stopPropagation();
        e.preventDefault();
        this.oglasiService.delete(this.oglas._id);
    }

    onSacuvaj(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!this.isSacuvan) {
            this.oglasiService.sacuvajOglas(this.oglas._id);
        } else {
            this.oglasiService.izbrisiSacuvanOglas(this.oglas._id);
            this.oglasiService.izbaciSacuvani(this.oglas._id);
        }
        this.isSacuvan = !this.isSacuvan;
    }
}
