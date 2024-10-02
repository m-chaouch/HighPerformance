import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBonusChartComponent } from './social-bonus-chart.component';

describe('SocialBonusChartComponent', () => {
  let component: SocialBonusChartComponent;
  let fixture: ComponentFixture<SocialBonusChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialBonusChartComponent]
    });
    fixture = TestBed.createComponent(SocialBonusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
