import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuardService {

    constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

    canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn()
            .pipe(
                map((isLoggedIn): boolean => {
                    this.userService.getOwnUser().subscribe((user): boolean => {
                        if (!isLoggedIn || user.isAdmin !== true) {
                            alert('access only for admin');
                            void this.router.navigate(['']); // Redirect to unauthorized page
                            return false;
                        }
                    });
                    return true;
                })
            );
    }
}
