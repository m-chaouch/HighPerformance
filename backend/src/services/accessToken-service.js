const axios = require('axios');
const qs = require('querystring');

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';

// Konvertierung der Zugangsdaten in eine URL-kodierte Zeichenkette für die OAuth-Authentifizierung
const body = qs.stringify({
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'ratschuweit',
    password: '*Safb02da42Demo$'
});

const config1 = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    }
};

/**
 * getToken
 *
 * Diese asynchrone Funktion ist verantwortlich für die Authentifizierung mit dem OAuth-Dienst
 * und das Abrufen eines Zugriffstokens, das für nachfolgende API-Anfragen verwendet wird.
 *
 * Die Funktion sendet eine POST-Anfrage mit den erforderlichen Anmeldeinformationen an den
 * Token-Ausgabe-Endpunkt und erhält ein Zugriffstoken als Antwort, das in nachfolgenden API-Aufrufen
 * zur Autorisierung verwendet werden kann.
 *
 * Bei einem Fehler in der Anfrage wird eine Fehlermeldung in der Konsole ausgegeben und der Fehler wird
 * weitergegeben, um ihn im aufrufenden Code behandeln zu können.
 *
 * @returns {Promise<string>} Ein Versprechen, das das abgerufene Zugriffstoken zurückgibt.
 * @throws {Error} Gibt einen Fehler weiter, falls die Tokenanforderung fehlschlägt.
 */
async function getToken() {
    try {
        // Senden der POST-Anfrage zur Tokenausgabe an den OAuth-Server
        const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config1);

        // Überprüfung auf Fehler in der API-Antwort
        if (res.data.error) throw new Error(res.data.error);

        // Extrahieren und Rückgabe des Zugriffstokens
        const accessToken = res.data['access_token'];
        //console.log('Access Token:', accessToken);
        return accessToken;
    } catch (error) {
        // Ausgabe einer Fehlermeldung bei Problemen mit der Tokenanforderung
        console.error('Fehler beim Abrufen des Zugriffstokens:', error.message);
        throw error; // Fehler weitergeben, um ihn im aufrufenden Code zu behandeln
    }
}

// Export der getToken-Funktion und der baseUrl-Konstante zur Verwendung in anderen Modulen
module.exports = {
    getToken,
    baseUrl: baseUrl
};