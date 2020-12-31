import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JproductComponent } from './jproduct.component';

describe('JproductComponent', () => {
  let component: JproductComponent;
  let fixture: ComponentFixture<JproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
