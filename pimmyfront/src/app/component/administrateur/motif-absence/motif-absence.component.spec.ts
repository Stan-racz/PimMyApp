import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifAbsenceComponent } from './motif-absence.component';

describe('MotifAbsenceComponent', () => {
  let component: MotifAbsenceComponent;
  let fixture: ComponentFixture<MotifAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotifAbsenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
