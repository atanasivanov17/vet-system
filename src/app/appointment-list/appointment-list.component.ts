import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { EncryptionService } from '../services/encryption.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent {
  appointments: Appointment[] = [];
  role: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private cookieService: CookieService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (res: Appointment[]) => (this.appointments = res),
      error: (error) => console.error(error),
    });

    this.role = this.encryptionService.decrypt(this.cookieService.get('role'));
  }

  deleteAppointment(id: number) {
    return this.appointmentService.deleteAppointment(id).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.error(error),
      complete: () => this.ngOnInit(),
    });
  }
}
