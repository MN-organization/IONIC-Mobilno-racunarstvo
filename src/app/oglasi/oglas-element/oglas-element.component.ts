import {Component, Input, OnInit} from '@angular/core';
import {OglasModel} from '../../modeli/oglas.model';
import {OglasiService} from '../oglasi.service';

@Component({
  selector: 'app-oglas-element',
  templateUrl: './oglas-element.component.html',
  styleUrls: ['./oglas-element.component.scss'],
})
export class OglasElementComponent implements OnInit {

  @Input() public oglas: OglasModel;

  @Input() isMyOglas;

  constructor(private oglasiService: OglasiService) { }

  ngOnInit() {}

  onDelete() {
    this.oglasiService.delete(this.oglas._id);
  }
}
