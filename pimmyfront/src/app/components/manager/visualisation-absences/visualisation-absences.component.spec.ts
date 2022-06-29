import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationAbsencesComponent } from './visualisation-absences.component';

describe('VisualisationAbsencesComponent', () => {
  let component: VisualisationAbsencesComponent;
  let fixture: ComponentFixture<VisualisationAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualisationAbsencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
