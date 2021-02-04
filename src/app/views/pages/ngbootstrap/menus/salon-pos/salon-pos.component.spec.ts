import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonPosComponent } from './salon-pos.component';

describe('SalonPosComponent', () => {
  let component: SalonPosComponent;
  let fixture: ComponentFixture<SalonPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
