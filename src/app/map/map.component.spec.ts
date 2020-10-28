import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule,  ReactiveFormsModule} from "@angular/forms";

import { MapComponent } from './map.component';
import { HttpClientModule } from '@angular/common/http';


describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
