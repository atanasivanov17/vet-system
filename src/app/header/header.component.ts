import { Component } from '@angular/core';
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
    private encryptionService: EncryptionService){
  }

  ngOnInit(): void {
    if(this.cookieService.check('role')) {
      this.encryptionService.decrypt(this.cookieService.get('role'))
    } 
  }
}
