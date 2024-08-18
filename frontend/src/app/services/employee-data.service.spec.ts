/**
 * Dieser Unit-Test überprüft, ob der `EmployeeDataPoint`-Service in einer Angular-Anwendung
 * korrekt erstellt und injiziert wird. Der Test verwendet das Angular-Test-Framework zusammen
 * mit Jasmine, um sicherzustellen, dass der Service ordnungsgemäß funktioniert.
 *
 * @import { TestBed } from '@angular/core/testing' - Importiert TestBed, ein Angular-Utility,
 *          um eine Testumgebung zu konfigurieren und Abhängigkeiten zu injizieren.
 * @import { EmployeeDataPoint } from './employee-data.service' - Importiert den Service,
 *          der getestet werden soll.
 *
 * @describe('EmployeeDataService') - Beschreibt eine Testgruppe für den `EmployeeDataPoint`-Service.
 *
 * @let service: EmployeeDataPoint - Deklariert eine Variable, um die Instanz des Services zu speichern.
 *
 * @beforeEach() - diese Funktion wird vor jedem Testfall in dieser Testgruppe ausgeführt.
 *  - @TestBed.configureTestingModule({}) - Konfiguriert das Testmodul für den Test. Hier wird das Modul
 *    ohne spezifische Abhängigkeiten konfiguriert.
 *  - @service = TestBed.inject(EmployeeDataPoint) - Erstellt eine Instanz des `EmployeeDataPoint`-Services
 *    mithilfe von Angulars Dependency Injection und weist sie der `service`-Variablen zu.
 *
 * @it('should be created') - Ein Testfall, der überprüft, ob der Service erfolgreich erstellt wurde.
 *  - @expect(service).toBeTruthy() - Erwartet, dass die Service-Instanz existiert (d.h., dass sie nicht `null`
 *    oder `undefined` ist). Wenn diese Bedingung wahr ist, besteht der Test.
 *
 * Der Zweck dieses Tests ist es, sicherzustellen, dass der `EmployeeDataService`-Service korrekt instanziiert wird
 * und keine grundlegenden Fehler auftreten, wenn der Service in der Anwendung verwendet wird.
 */


import { TestBed } from '@angular/core/testing';
import { EmployeeDataService } from './employee-data.service';

describe('EmployeeDataService', () => {
    let service: EmployeeDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EmployeeDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })
})
