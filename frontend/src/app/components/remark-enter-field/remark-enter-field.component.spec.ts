import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkEnterFieldComponent } from './remark-enter-field.component';

describe('RemarkEnterFieldComponent', () => {
  let component: RemarkEnterFieldComponent;
  let fixture: ComponentFixture<RemarkEnterFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemarkEnterFieldComponent]
    });
    fixture = TestBed.createComponent(RemarkEnterFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
