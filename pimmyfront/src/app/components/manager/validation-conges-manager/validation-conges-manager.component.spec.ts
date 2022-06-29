import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCongesManagerComponent } from './validation-conges-manager.component';

describe('ValidationCongesManagerComponent', () => {
  let component: ValidationCongesManagerComponent;
  let fixture: ComponentFixture<ValidationCongesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationCongesManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCongesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
