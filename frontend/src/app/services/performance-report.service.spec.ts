import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PerformanceReportService } from './performance-report.service';
import { environment } from "../../../environments/environment";
import { PerformanceReportDatapoint } from "../interfaces/performance-report-datapoint"; // Adjust path based on your project structure
import { SalesPerformance } from '../../../../backend/src/models/SalesPerformance';
import { SocialPerformance } from '../../../../backend/src/models/SocialPerformance';
import { PerformanceRecord } from '../../../../backend/src/models/SocialPerformance';
import { storePerformanceRecord } from '../../../../backend/src/services/performance-report-service'
import { createDB, closeDB } from '../../../../backend/unit-tests/support/mockdb-new';
import {HttpClient} from '@angular/common/http';




describe('PerformanceReportService', () => {
    let service: PerformanceReportService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let db: any;



    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],  // Wichtig: HttpClientTestingModule muss importiert werden
            providers: [PerformanceReportService]
        });
        service = TestBed.inject(PerformanceReportService);  // Service wird hier injiziert
        httpMock = TestBed.inject(HttpTestingController);    // HttpTestingController wird hier injiziert
    });



    beforeAll(async () => {
        // Verbindung zur Test-Datenbank
        db = await createDB();
    });

    afterAll(async () => {
        await closeDB();
    });

    afterEach(() => {
        httpMock.verify(); // Verifizieren, dass keine ausstehenden HTTP-Requests vorhanden sind
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create performance record', async () => {
        const salesPerf = new SalesPerformance();
        const socialPerf = new SocialPerformance();

        // Daten hinzufügen
        salesPerf.addCompanyToList({ company: "Innovative Tech", rating: "none" });
        salesPerf.addSales("Innovative Tech", 200);
        salesPerf.addCompanyToList({ company: "Eco Solutions", rating: "good" });
        salesPerf.addSales("Eco Solutions", 150);
        salesPerf.addCompanyToList({ company: "Green Energy", rating: "good" });
        salesPerf.addSales("Green Energy", 180);
        salesPerf.addCompanyToList({ company: "Tech Dynamics", rating: "excellent" });
        salesPerf.addSales("Tech Dynamics", 100);

        // Soziale Leistungen aktualisieren
        socialPerf.updateCriterion('leadershipCompetence', 3);
        socialPerf.updateCriterion('opennessToEmployee', 4);
        socialPerf.updateCriterion('socialBehaviourToEmployee', 2);
        socialPerf.updateCriterion('attitudeTowardsClients', 4);
        socialPerf.updateCriterion('communicationSkills', 5);
        socialPerf.updateCriterion('integrityToCompany', 5);

        // PerformanceRecord erstellen
        const perfRecord = new PerformanceRecord("dfdsfs", {
            socialPerformance: socialPerf,
            salesPerformance: salesPerf
        });

        await storePerformanceRecord(perfRecord);
        //console.log(perfRecord);
    });

    it('should fetch performance report by SID', () => {
        const dummyData: PerformanceReportDatapoint[] = [
      //      { /* mock data matching your PerformanceReportDatapoint structure */ },
        //    { /* mock data */ }
        ];

        const testSID = '123456'; // Beispiel-SID
        const expectedUrl = `${environment.apiEndpoint}/api/performance-report/${testSID}`;

        // Aufruf der Service-Methode
        service.getPerformanceReport(testSID).then((data) => {
            expect(data.length).toBe(2);
            expect(data).toEqual(dummyData);
        });

        // HTTP GET-Anfrage erwarten
        const req = httpMock.expectOne(expectedUrl);
        expect(req.request.method).toBe('GET');

        // Mock-Antwort zurücksenden
        req.flush(dummyData);
    });
});
