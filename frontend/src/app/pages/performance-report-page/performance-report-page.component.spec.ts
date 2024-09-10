import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReportPageComponent } from './performance-report-page.component';

describe('PerformanceReportPageComponent', () => {
  let component: PerformanceReportPageComponent;
  let fixture: ComponentFixture<PerformanceReportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceReportPageComponent]
    });
    fixture = TestBed.createComponent(PerformanceReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
