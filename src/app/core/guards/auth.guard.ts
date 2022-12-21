<<<<<<< HEAD
import { AuthService } from './../services/auth/auth.service';
=======


>>>>>>> 633568cd6d4cc87e5b738eca690cf7397dfd63ff
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
<<<<<<< HEAD
=======
import { AuthService } from '../services/auth/auth.service';
>>>>>>> 633568cd6d4cc87e5b738eca690cf7397dfd63ff

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
<<<<<<< HEAD
  constructor(private authService: AuthService, private router: Router) {}
=======
  constructor(private authService: AuthService, private router: Router) { }
>>>>>>> 633568cd6d4cc87e5b738eca690cf7397dfd63ff

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      })
    );
  }
}
