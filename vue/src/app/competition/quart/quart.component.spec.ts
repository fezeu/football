import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartComponent } from './quart.component';

describe('QuartComponent', () => {
  let component: QuartComponent;
  let fixture: ComponentFixture<QuartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
