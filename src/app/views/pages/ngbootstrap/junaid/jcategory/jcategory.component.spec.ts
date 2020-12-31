import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JcategoryComponent } from './jcategory.component';

describe('JcategoryComponent', () => {
  let component: JcategoryComponent;
  let fixture: ComponentFixture<JcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
