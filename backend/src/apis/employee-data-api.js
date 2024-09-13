/**
 * Controller-Funktion, um Mitarbeiterdaten zu verarbeiten und als HTTP-Antwort zurückzugeben.
 *
 * Diese Funktion wird typischerweise in einer Express-Route verwendet, um eine Anfrage
 * zum Abrufen von Mitarbeiterdaten zu bearbeiten. Sie ruft den `getEmployeeService` aus
 * dem `employeeDataService` auf, um die Daten abzurufen und sendet die Ergebnisse
 * als HTTP-Antwort zurück.
 *
 * @requires ../services/employee-data-service - Der Service, der die Logik zum Abrufen
 *           der Mitarbeiterdaten kapselt.
 *
 * @function getEmployeeData
 * @param {Object} req - Das Anforderungsobjekt, das Informationen über die eingehende
 *                       HTTP-Anfrage enthält.
 * @param {Object} res - Das Antwortobjekt, das verwendet wird, um die HTTP-Antwort
 *                       an den Client zu senden.
 *
 * @returns {void}
 *
 * @funktionalität
 * 1. `employeeDataService.getEmployeeService()` wird aufgerufen, um die Mitarbeiterdaten
 *     zu erhalten. Dies gibt ein Promise zurück.
 * 2. Wenn das Promise erfolgreich ist, wird die empfangene Datenliste an den Client gesendet.
 * 3. Bei einem Fehler wird ein HTTP-Statuscode 500 gesendet, der auf einen internen Serverfehler hinweist.
 */


const employeeDataService = require('../services/employee-data-service');

exports.getEmployeeData = function (req, res) {
    employeeDataService.getEmployeeService().then(employeeData => {
        res.send(employeeData);
    }).catch( _ => {
        res.status(500).send()
    })
}

exports.getOneEmployee = function (req, res) {
    const id = req.params.id;
    employeeDataService.getOneEmployeeService(id).then(employeeData => {
        res.send(employeeData);
    }).catch( _ => {
        res.status(500).send()
    })
}
