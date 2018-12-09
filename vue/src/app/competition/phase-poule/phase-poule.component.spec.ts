import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasePouleComponent } from './phase-poule.component';

describe('PhasePouleComponent', () => {
  let component: PhasePouleComponent;
  let fixture: ComponentFixture<PhasePouleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasePouleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasePouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
