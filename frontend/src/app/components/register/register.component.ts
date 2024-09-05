import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Credentials} from "../../models/Credentials";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";


@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf
    ],
    styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {

    credentials: Credentials;
    loginError: string;

    constructor(private authService: AuthService, private router: Router) { }


    ngOnInit(): void {
        this.resetCredentials();
    }


    performRegister(): void{

    }

    goToLogin(): void {
        void this.router.navigate(['login']);
    }

    resetCredentials(): void{
        this.credentials = new Credentials('', '');
    }

    enterApplication(): void{
        void this.router.navigate(['']);
    }
}
