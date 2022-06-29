import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureInstitutionComponent } from './fermeture-institution.component';

describe('FermetureInstitutionComponent', () => {
  let component: FermetureInstitutionComponent;
  let fixture: ComponentFixture<FermetureInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FermetureInstitutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FermetureInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
