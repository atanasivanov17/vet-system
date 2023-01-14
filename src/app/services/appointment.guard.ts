import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentGuard implements CanActivate {
  role: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private encryptionService: EncryptionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(!this.cookieService.check('role') || !this.cookieService.check('jwt-token')) {
        this.router.navigate(['/']).then( () => {
          window.location.reload();
        });
        return false;
      }else{
        this.role = this.encryptionService.decrypt(this.cookieService.get('role'));
      }

      if(state.url == '/add-appointment' && this.role == 'VET'){
        return false;
      }
      
    return true;
  }
}
