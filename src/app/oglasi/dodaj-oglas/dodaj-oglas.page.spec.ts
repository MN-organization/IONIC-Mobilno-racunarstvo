import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DodajOglasPage } from './dodaj-oglas.page';

describe('DodajOglasPage', () => {
  let component: DodajOglasPage;
  let fixture: ComponentFixture<DodajOglasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajOglasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DodajOglasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
