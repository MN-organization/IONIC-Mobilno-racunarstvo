import {Component, Input, OnInit} from '@angular/core';
import {OglasModel} from '../../modeli/oglas.model';
import {OglasiService} from '../oglasi.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-oglas-details',
    templateUrl: './oglas-details.page.html',
    styleUrls: ['./oglas-details.page.scss'],
})
export class OglasDetailsPage implements OnInit {

    @Input() public oglas: OglasModel;
    oglasId: string;

    constructor(private oglasiService: OglasiService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
                this.oglasId = params.id;
            }
        );
        this.oglasiService.getOglas(this.oglasId).subscribe((oglas) => this.oglas = oglas);
    }

}
