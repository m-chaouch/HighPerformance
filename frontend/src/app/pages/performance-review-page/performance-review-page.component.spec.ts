import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewPageComponent } from './performance-review-page.component';

describe('PerformanceReviewPageComponent', () => {
  let component: PerformanceReviewPageComponent;
  let fixture: ComponentFixture<PerformanceReviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceReviewPageComponent]
    });
    fixture = TestBed.createComponent(PerformanceReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
