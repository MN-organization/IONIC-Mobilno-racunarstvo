import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OglasiPage } from './oglasi.page';

describe('OglasiPage', () => {
  let component: OglasiPage;
  let fixture: ComponentFixture<OglasiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OglasiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OglasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
