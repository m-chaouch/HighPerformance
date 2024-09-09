import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../../services/employee-data.service';
import { EmployeeDatapoint } from '../../interfaces/employee-datapoint';
import { MatTableModule } from '@angular/material/table';

/**
 * EmployeePageComponent
 *
 * Diese Angular-Komponente ist verantwortlich für die Anzeige einer Tabelle mit Mitarbeiterdaten.
 * Sie ruft die Daten von einem Backend-Service ab und zeigt sie mithilfe der Angular Material-Tabelle an.
 *
 * Die Komponente verwendet den EmployeeDataService, um Mitarbeiterinformationen abzurufen,
 * die dann im `employee`-Array gespeichert und in einer Tabelle angezeigt werden.
 * Die Tabelle enthält Spalten für Mitarbeiter-ID, Vorname, Nachname und Abteilung.
 */
@Component({
    selector: 'app-employee-page',
    templateUrl: 'employee-page.component.html',
    standalone: true,
    imports: [
        MatTableModule
    ],
    styleUrls: ['employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {

    /**
     * Spalten, die in der Mitarbeitertabelle angezeigt werden.
     * Die Werte müssen den Eigenschaftsnamen im EmployeeDatapoint-Interface entsprechen.
     */
    displayedColumns = ['employeeId', 'firstName', 'lastName', 'unit'];

    /**
     * Array, das die vom Backend abgerufenen Mitarbeiterdaten enthält.
     * Wird als leeres Array initialisiert.
     */
    employee: EmployeeDatapoint[] = [];

    /**
     * Konstruktor, der den EmployeeDataService injiziert, um das Abrufen der Mitarbeiterdaten zu ermöglichen.
     *
     * @param employeeDataService Service, der verwendet wird, um Mitarbeiterdaten von der Backend-API abzurufen.
     */
    constructor(private employeeDataService: EmployeeDataService) { }

    /**
     * Angular-Lebenszyklus-Hook, der nach der Initialisierung der Komponente aufgerufen wird.
     * Diese Methode ruft die fetchEmployee()-Methode auf, um die Mitarbeiterdaten beim Erstellen der Komponente zu laden.
     */
    ngOnInit(): void {
        this.employee = this.employeeDataService.fetchEmployee();
    }
}
