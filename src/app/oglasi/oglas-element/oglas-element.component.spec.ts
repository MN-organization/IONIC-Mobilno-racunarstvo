import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OglasElementComponent } from './oglas-element.component';

describe('OglasElementComponent', () => {
  let component: OglasElementComponent;
  let fixture: ComponentFixture<OglasElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OglasElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OglasElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
