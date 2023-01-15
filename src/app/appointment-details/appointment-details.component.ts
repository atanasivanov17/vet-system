import { Appointment } from './../dto/appointment.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  appointment?: Appointment;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (res: Appointment) => this.appointment = res,
      error: (error: any) => this.router.navigate(['appointments'])
    })
  }

}
