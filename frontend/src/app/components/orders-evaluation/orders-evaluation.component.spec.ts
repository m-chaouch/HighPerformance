import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersEvaluationComponent } from './orders-evaluation.component';

describe('OrdersEvaluationComponent', () => {
  let component: OrdersEvaluationComponent;
  let fixture: ComponentFixture<OrdersEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersEvaluationComponent]
    });
    fixture = TestBed.createComponent(OrdersEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
