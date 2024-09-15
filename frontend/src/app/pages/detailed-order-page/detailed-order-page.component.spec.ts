import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedOrderPageComponent } from './detailed-order-page.component';

describe('DetailedOrderPageComponent', () => {
  let component: DetailedOrderPageComponent;
  let fixture: ComponentFixture<DetailedOrderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedOrderPageComponent]
    });
    fixture = TestBed.createComponent(DetailedOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
