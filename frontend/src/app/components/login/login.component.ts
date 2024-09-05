import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Credentials} from '../../models/Credentials';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // object for input-binding
    credentials: Credentials;

    loginError: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.resetCredentials();
    }

    /**
     * handles login operation, by calling the authService
     */
    performLogin(): void{
        this.authService.login(this.credentials).subscribe((response): void => {
            if (response.status === 200){ // if response status is 200, assume login was successful
                this.resetCredentials();
                this.enterApplication();
            }else{
                this.loginError = response.body as string;
            }
        },
        (error: HttpErrorResponse): void => {
            this.loginError = error.error as string;
        }
        );
    }


    goToRegister(): void {
        /**
         * The `void` operator is used here to explicitly ignore the Promise
         * returned by `this.router.navigate()`. This ensures that the return
         * value (a Promise) is not used or handled further.
         *
         * Normally, you could use the returned Promise to wait for the navigation
         * to complete or to handle errors, but in this case, it is intentionally
         * ignored as the result of the navigation is not required.
         */
        void this.router.navigate(['/register']);
    }

    /**
     * resets login form
     */
    resetCredentials(): void{
        this.credentials = new Credentials('', '');
    }

    /**
     * redirects to the landing page
     */
    enterApplication(): void{
        void this.router.navigate(['']);
    }
}
