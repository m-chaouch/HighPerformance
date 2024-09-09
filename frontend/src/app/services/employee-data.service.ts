/**
 * Dieser Angular-Service wird verwendet, um HTTP-Anfragen an eine API zu stellen,
 * um Daten über Mitarbeiter abzurufen. Der Service kapselt die Logik für die Kommunikation
 * mit dem Backend und wird typischerweise in einer Komponente oder einem anderen Service verwendet,
 * um Daten asynchron zu laden.
 *
 * @module EmployeeDataPoint
 *
 * @requires @angular/core - Der Injectable-Decorator, der die Klasse als Service kennzeichnet,
 * eslint-disable-next-line jsdoc/check-indentation
 *          der von Angulars Dependency Injection System verwaltet wird.
 * @requires @angular/common/http - Die HttpClient-Klasse, die verwendet wird, um HTTP-Anfragen zu senden,
 *          sowie HttpResponse, um die vollständige HTTP-Antwort zu verarbeiten.
 * @requires rxjs/Observable - Das Observable-Objekt, das verwendet wird, um asynchrone Datenströme zu verwalten.
 * @requires ../interfaces/employee-datapoint - Die Schnittstelle, die die Struktur der Daten beschreibt,
 *          die von der API erwartet oder empfangen werden.
 * @requires ../../../environments/environment - Die Umgebungsvariablen, die die API-URL und andere
 *          konfigurationsspezifische Werte enthalten.
 *
 * @Injectable({ providedIn: 'root' })
 * Der Injectable-Decorator macht diesen Service in der gesamten Anwendung als Singleton verfügbar,
 * was bedeutet, dass es in der gesamten Anwendung nur eine Instanz dieses Services gibt.
 *
 * @class EmployeeDataPoint
 *
 * @constructor
 * @param {HttpClient} http - Eine Instanz von HttpClient, die verwendet wird, um HTTP-Anfragen zu senden.
 *
 * @method getEmployeeData
 * @description Diese Methode stellt eine GET-Anfrage an den API-Endpunkt '/api/employee' und gibt
 *              ein Observable zurück, das die gesamte HTTP-Antwort (einschließlich Headers und Status)
 *              enthält. Die Methode ist für das Abrufen einer Liste von Mitarbeiterdaten zuständig.
 *
 * @returns {Observable<HttpResponse<EmployeeDatapoint[]>>} Ein Observable, das die HTTP-Antwort mit
 *          einem Array von EmployeeDatapoint-Objekten enthält.
 */



import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDatapoint} from '../interfaces/employee-datapoint';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeDataService {
    employee: EmployeeDatapoint[] = [];
    constructor(private http: HttpClient) { }

    getEmployeeData(): Observable<HttpResponse<EmployeeDatapoint[]>> {
        return this.http.get<EmployeeDatapoint[]>(environment.apiEndpoint + '/api/employee', {observe: 'response', withCredentials: true});
    }

    /**
     * Ruft Mitarbeiterdaten vom Backend ab, indem der EmployeeDataService verwendet wird.
     * Die abgerufenen Daten werden im `employee`-Array gespeichert.
     * Fehler werden durch eine Ausgabe in der Konsole behandelt.
     */
    fetchEmployee(): EmployeeDatapoint[] {
        if (this.employee.length === 0) {
            this.getEmployeeData().subscribe((response): EmployeeDatapoint[] => {
                if (response.status === 200) {
                    this.employee = response.body || [];
                    return this.employee;
                }
            }, error => {
                console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
            });
        } else {
            return this.employee;
        }
    }
}
