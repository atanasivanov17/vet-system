import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {  
  role: string = "";

  constructor(  
    private cookieService: CookieService,
    private encryptionService: EncryptionService,
    private router: Router){
  }

  ngOnInit(): void {
    if(this.cookieService.check('role')) {
      this.role = this.encryptionService.decrypt(this.cookieService.get('role'))
    }
  }

  signOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
    this.role = '';
  }
}
