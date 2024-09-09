import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusComputationPageComponent } from './bonus-computation-page.component';

describe('BonusComputationPageComponent', () => {
  let component: BonusComputationPageComponent;
  let fixture: ComponentFixture<BonusComputationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonusComputationPageComponent]
    });
    fixture = TestBed.createComponent(BonusComputationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
