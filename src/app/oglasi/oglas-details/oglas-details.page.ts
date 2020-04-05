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
  oglasId: number;

  constructor(private oglasiService: OglasiService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params) => {
          this.oglasId = params.id;
      }
    );
    this.oglas = this.oglasiService.getOglas(this.oglasId);
  }

}
