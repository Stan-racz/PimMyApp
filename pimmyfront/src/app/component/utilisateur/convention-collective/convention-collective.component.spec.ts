import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionCollectiveComponent } from './convention-collective.component';

describe('ConventionCollectiveComponent', () => {
  let component: ConventionCollectiveComponent;
  let fixture: ComponentFixture<ConventionCollectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionCollectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionCollectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
