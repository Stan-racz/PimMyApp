import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheseCongesComponent } from './synthese-conges.component';

describe('SyntheseCongesComponent', () => {
  let component: SyntheseCongesComponent;
  let fixture: ComponentFixture<SyntheseCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntheseCongesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntheseCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
