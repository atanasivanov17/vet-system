import { Appointment } from './../dto/appointment.dto';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  endpoint: string = 'https://css.teknologija.com/appointment';
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

  getAppointmentById(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.endpoint}/${id}`, this.httpHeader);
}

  deleteAppointment(id: number): Observable<any> {
    return this.httpClient.delete(`${this.endpoint}/${id}`, this.httpHeader);
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put<Appointment>(`${this.endpoint}/${id}`, appointment, this.httpHeader);
}

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(this.endpoint, appointment, this.httpHeader);
  }
}
