import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePageComponent } from './employee-page.component';

/**
 * Test Suite für EmployeePageComponent
 *
 * Diese Test Suite ist verantwortlich für das Testen der EmployeePageComponent.
 * Es wird überprüft, ob die Komponente korrekt erstellt wird und ordnungsgemäß funktioniert.
 *
 * Die Suite enthält folgende Testfälle:
 *
 * - Initialisierung der Komponente: Überprüft, ob die EmployeePageComponent erfolgreich erstellt wurde.
 */

describe('EmployeePageComponent', () => {
    let component: EmployeePageComponent;
    let fixture: ComponentFixture<EmployeePageComponent>;

    /**
     * Vor jedem Testlauf wird das Testbed konfiguriert und die benötigten Komponenten deklariert.
     * Die Testumgebung wird mit der EmployeePageComponent erstellt.
     */
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployeePageComponent]
        })
            .compileComponents();
    });

    /**
     * Vor jedem Test wird eine Instanz der Komponente erstellt und initialisiert.
     * Änderungen an der Komponente werden durch fixture.detectChanges() erfasst.
     */
    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /**
     * Testfall: Überprüft, ob die Komponente erfolgreich erstellt wurde.
     * Der Test erwartet, dass die Komponente wahrheitsgemäß ist, was bedeutet,
     * dass sie erfolgreich instanziiert wurde.
     */
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
