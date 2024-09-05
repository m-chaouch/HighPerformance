import {Component} from '@angular/core';
import {RegisterComponent} from "../../components/register/register.component";
import {MatCardModule} from "@angular/material/card";

/**
 * This page wraps the login-component
 */
@Component({
    selector: 'app-login-page',
    templateUrl: './register-page.component.html',
    standalone: true,
    imports: [
        RegisterComponent,
        MatCardModule
    ],
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

    constructor() { }

}
