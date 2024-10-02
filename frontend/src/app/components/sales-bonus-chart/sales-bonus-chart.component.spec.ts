import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBonusChartComponent } from './sales-bonus-chart.component';

describe('SalesBonusChartComponent', () => {
  let component: SalesBonusChartComponent;
  let fixture: ComponentFixture<SalesBonusChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesBonusChartComponent]
    });
    fixture = TestBed.createComponent(SalesBonusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
