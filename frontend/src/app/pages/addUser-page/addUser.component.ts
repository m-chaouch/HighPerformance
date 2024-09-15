import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {CredentialsRegister} from "../../models/Credentials";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";


@Component({
    selector: "app-register",
    templateUrl: "addUser.component.html",
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf
    ],
    styleUrls: ["./addUser.component.css"]
})

export class AddUserComponent implements OnInit {

    credentialsRegister: CredentialsRegister;
    registerError: string;

    constructor(private authService: AuthService, private router: Router) { }

    /**
     * Initialisiert das Formular, indem die Credentials zurückgesetzt werden.
     */
    ngOnInit(): void {
        this.resetCredentials();
    }

    /**
     * Führt den Registrierungsvorgang durch, indem die eingegebenen
     * Registrierungsdaten an den AuthService gesendet werden.
     * Bei erfolgreicher Registrierung wird der Benutzer weitergeleitet,
     * ansonsten wird ein Fehler angezeigt.
     */
    performRegister(): void{
        this.authService.register(this.credentialsRegister).subscribe((response): void => {
                if (response.status === 200){
                    this.resetCredentials();
                }else{
                    this.setRegisterError(response.body as string);
                }
            },
            (error: HttpErrorResponse): void => {
                this.setRegisterError(error.error as string);
            }
        );
    }

    /**
     * Überprüft die Eingaben und führt die Registrierung durch,
     * falls alle Eingaben gültig sind. Ansonsten wird eine Fehlermeldung angezeigt.
     */
    validateInput(): void {
        const checkRegisterInput = this.authService.validateRegister(this.credentialsRegister);
        if (checkRegisterInput === null) {
            return this.performRegister();
        }
        this.setRegisterError(checkRegisterInput);
    }

    /**
     * Setzt die Fehlermeldung und entfernt sie nach einer bestimmten Zeit (3 Sekunden).
     * @param message Die anzuzeigende Fehlermeldung.
     */
    setRegisterError(message: string): void {
        this.registerError = message;

        setTimeout(() => {
            this.registerError = ''; // Fehlermeldung zurücksetzen
        }, 3000); // 3000 ms = 3 Sekunden
    }

    /**
     * Setzt die Registrierungsdaten (credentialsRegister) zurück.
     */
    resetCredentials(): void{
        this.credentialsRegister = new CredentialsRegister('', '', '', '', '', '', '');
    }

}
