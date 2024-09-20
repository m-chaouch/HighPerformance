import {Injectable} from '@angular/core';
import {Credentials} from '../models/Credentials';
import {CredentialsRegister} from '../models/Credentials'
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 * Services specify logic, which is instantiated singularly -> it is shared between components
 * This service handles authorization with the backend
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedIn = false;
    authPreCheck = false;
    listeners: ((param: boolean) => void)[] = [];

    constructor(private http: HttpClient) {
    }

    /**
     * returns the current login state
     */
    isLoggedIn(): Observable<boolean> {
        if (!this.authPreCheck) {
            return this.checkLogin()
                .pipe(
                    map((response: HttpResponse<{ loggedIn: boolean }>): boolean => {
                        this.emitLoginChange(response.body.loggedIn);
                        return response.body.loggedIn;
                    })
                );
        }
        return new Observable((observer: Observer<boolean>): void => {
            observer.next(this.loggedIn);
            observer.complete();
        });
    }

    /**
     * subscribe to changes of the login state
     *
     * @param callback
     */
    subscribeLoginChange(callback: (param: boolean) => void): void {
        this.listeners.push(callback);
    }

    /**
     * notifies all listeners with a new login state
     *
     * @param newState
     */
    emitLoginChange(newState: boolean): void {
        this.listeners.forEach((callback): void => {
            callback(newState);
        });
    }

    /**
     * retrieves the login state from backend
     */
    checkLogin(): Observable<HttpResponse<{ loggedIn: boolean }>> {
        return this.http.get<{ loggedIn: boolean }>(environment.apiEndpoint + '/api/login', {
            withCredentials: true,
            observe: 'response'
        });
    }

    /**
     * authenticates a user with credentials against backend
     *
     * @param credentials consisting of username and password
     */
    login(credentials: Credentials): Observable<HttpResponse<any>> {
        return this.http.post(environment.apiEndpoint + '/api/login', credentials, {
            withCredentials: true,
            observe: 'response',
            responseType: 'text'
        })
            .pipe(
                tap((response): void => {
                    if (response.status === 200) { // if request was successful
                        this.loggedIn = true; // set new stat
                        this.emitLoginChange(true); // notify listeners
                    }
                })
            );
    }

    /**
     * register a new user
     *
     * @param credentialsRegister consisting of username, password, and additional registration details
     */
    register(credentialsRegister: CredentialsRegister): Observable<HttpResponse<any>> {
        return this.http.post(environment.apiEndpoint + '/api/register', credentialsRegister, {
            withCredentials: true,
            observe: 'response',
            responseType: 'text'
        }).pipe(
            tap((response): void => {
                if (response.status === 200) { // if registration was successful
                    alert("Registration successfully");
                }
            })
        );
    }


    validateRegister(credentials: CredentialsRegister): string | null {
        // Check if any field is empty
        if (!credentials.username || !credentials.firstname || !credentials.lastname || !credentials.email || !credentials.password || !credentials.passwordConfirm) {
            return 'Please fill in all fields.';
        }

        // Check if email format is valid
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(credentials.email)) {
            return 'Please enter a valid email address.';
        }

        // Check if passwords match
        if (credentials.password !== credentials.passwordConfirm) {
            return 'Passwords do not match.';
        }
        // Check password strength (example: minimum 8 characters)

        // If all checks pass, return null (no error)
        return null;
    }

    /**
     *
     */
    logout(): Observable<HttpResponse<any>> {
        return this.http.delete(environment.apiEndpoint + '/api/login',
            {withCredentials: true, observe: 'response', responseType: 'text'}
        ).pipe(
            tap((response): void => {
                if (response.status === 200) {
                    this.loggedIn = false;
                    this.emitLoginChange(false);
                }
            })
        );
    }
}
