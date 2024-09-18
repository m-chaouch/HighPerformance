import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPerformanceEvaluationComponent } from './social-performance-evaluation.component';

describe('SocialPerformanceEvaluationComponent', () => {
  let component: SocialPerformanceEvaluationComponent;
  let fixture: ComponentFixture<SocialPerformanceEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialPerformanceEvaluationComponent]
    });
    fixture = TestBed.createComponent(SocialPerformanceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
