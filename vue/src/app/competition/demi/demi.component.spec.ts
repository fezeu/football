import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemiComponent } from './demi.component';

describe('DemiComponent', () => {
  let component: DemiComponent;
  let fixture: ComponentFixture<DemiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
