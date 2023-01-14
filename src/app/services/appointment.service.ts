import { AddAppointmentComponent } from './../add-appointment/add-appointment.component';
import { Appointment } from './../dto/appointment.dto';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  endpoint: string = 'http://localhost:8080/appointment';
  jwtToken: string = this.cookieService.get('jwt-token');

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`,
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  getAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.endpoint, this.httpHeader);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.httpClient.delete(`${this.endpoint}/${id}`, this.httpHeader);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(this.endpoint, appointment, this.httpHeader);
  }
}
