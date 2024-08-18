const { getToken, baseUrl } = require('./accessToken-service');
const axios = require('axios');

/**
 * employeeDataService
 *
 * Diese asynchrone Funktion ist verantwortlich für das Abrufen von Mitarbeiterdaten von einer API.
 * Zuerst wird ein Zugriffstoken über den getToken()-Dienst abgerufen, das dann in den Anfragen-header eingefügt wird,
 * um die Autorisierung sicherzustellen.
 *
 * Die Anfrage wird mit Axios an die angegebene URL gesendet, und die Daten werden dann extrahiert und lokal gefiltert,
 * um nur die benötigten Felder (Vorname, Nachname, Mitarbeiter-ID, Abteilung) zu behalten.
 *
 * Wenn die Daten erfolgreich abgerufen wurden, werden sie in der Konsole ausgegeben und als Ergebnis der Funktion zurückgegeben.
 * Im Fehlerfall wird eine Fehlermeldung in der Konsole ausgegeben.
 *
 * @returns {Promise<Array>} Ein Array von gefilterten Mitarbeiterdaten, falls die Anfrage erfolgreich ist.
 * @throws {Error} Gibt einen Fehler in der Konsole aus, falls die API-Anfrage fehlschlägt.
 */
async function employeeDataService() {
    try {
        // Abrufen des Zugriffstokens für die API-Anfrage
        const accessToken = await getToken();

        // Konfiguration der Anfragen-header mit dem abgerufenen Token
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        };

        // Definieren der URL für die Mitarbeiterdatenanfrage
        const url = `${baseUrl}/api/v1/employee/search`;

        // Senden der GET-Anfrage an die API
        const response = await axios.get(url, config);

        // Extrahieren der tatsächlichen Mitarbeiterdaten aus der API-Antwort
        const employees = response.data.data;

        // Filtern der benötigten Felder der Mitarbeiterdaten
        const filteredEmployees = employees.map(employee => ({
            firstName: employee.firstName,
            lastName: employee.lastName,
            employeeId: employee.employeeId,
            unit: employee.unit
        }));

        // Ausgabe der gefilterten Mitarbeiterdaten in der Konsole
        console.log('Employee data:', filteredEmployees);

        // Rückgabe der gefilterten Mitarbeiterdaten
        return filteredEmployees;

    } catch (error) {
        // Ausgabe einer Fehlermeldung, falls die API-Anfrage fehlschlägt
        console.error('Error calling Employee API:', error.message);
    }
}

// Export der employeeDataService-Funktion zur Verwendung in anderen Modulen
exports.getEmployeeService = employeeDataService;
