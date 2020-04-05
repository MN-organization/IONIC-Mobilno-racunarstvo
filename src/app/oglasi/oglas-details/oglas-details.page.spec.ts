import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OglasDetailsPage } from './oglas-details.page';

describe('OglasDetailsPage', () => {
  let component: OglasDetailsPage;
  let fixture: ComponentFixture<OglasDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OglasDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OglasDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
