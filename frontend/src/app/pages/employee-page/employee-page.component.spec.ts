import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePageComponent } from './employee-page.component';

describe('ExamplePageComponent', () => {
    let component: EmployeePageComponent;
    let fixture: ComponentFixture<EmployeePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeePageComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
