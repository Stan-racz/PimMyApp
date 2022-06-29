import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibiliteEmployesComponent } from './visibilite-employes.component';

describe('VisibiliteEmployesComponent', () => {
  let component: VisibiliteEmployesComponent;
  let fixture: ComponentFixture<VisibiliteEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibiliteEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibiliteEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
