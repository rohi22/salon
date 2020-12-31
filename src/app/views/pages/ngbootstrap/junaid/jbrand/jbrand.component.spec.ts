import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JbrandComponent } from './jbrand.component';

describe('JbrandComponent', () => {
  let component: JbrandComponent;
  let fixture: ComponentFixture<JbrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JbrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
