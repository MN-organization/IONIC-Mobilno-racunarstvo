import {Component, Input, OnInit} from '@angular/core';
import {OglasModel} from '../../modeli/oglas.model';

@Component({
  selector: 'app-oglas-element',
  templateUrl: './oglas-element.component.html',
  styleUrls: ['./oglas-element.component.scss'],
})
export class OglasElementComponent implements OnInit {

  @Input() public oglas: OglasModel;

  constructor() { }

  ngOnInit() {}

}
