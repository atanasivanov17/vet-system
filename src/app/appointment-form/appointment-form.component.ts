import { Appointment } from '../dto/appointment.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { formatDate } from '@angular/common';
import { appointmentDateTimeValidator } from '../validators/appointment-time.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '../services/encryption.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointment!: Appointment;
  id!: string | null;
  path!: string;
  role!: string;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.path = this.route.snapshot.url[0].path;
    this.role = this.encryptionService.decrypt(this.cookieService.get('role'));

    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      animalType: ['Dog', [Validators.required]],
      ownerIdCardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+[a-zA-Z]$')],
      ],
      ownerName: ['', [Validators.required]],
      ownerSurname: ['', [Validators.required]],
      ownerContactNumber: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.minLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      appointmentDateTime: [
        '',
        [Validators.required, appointmentDateTimeValidator()],
      ],
      appointmentDuration: ['10', [Validators.required]],
      reasonForAppointment: ['', [Validators.required]],
      vetNotes: this.role != 'RECEPTIONIST' ? ['', [Validators.required]] : [],
    });

    if (this.id != null && this.path == 'update') {
      this.appointmentService.getAppointmentById(parseInt(this.id)).subscribe({
        next: (x) => {
          this.appointmentForm.patchValue(x);
          let date = x.appointmentDate.split('/');
          this.appointmentForm.patchValue({
            appointmentDateTime: `${date[2]}-${date[1]}-${date[0]}T${x.appointmentTime}`,
          });
        },
        error: (error) => this.router.navigate(['appointments']),
      });
    }
  }

  submitForm() {
    let date: Date = new Date(
      this.appointmentForm.controls['appointmentDateTime'].value
    );
    this.appointment = this.appointmentForm.value;
    this.appointment.appointmentDate = formatDate(
      date.toLocaleDateString(),
      'dd/MM/yyyy',
      'en'
    );
    this.appointment.appointmentTime = `${String(date.getHours()).padStart(
      2,
      '0'
    )}:${String(date.getMinutes()).padStart(2, '0')}`;

    if (this.id != null && this.path == 'update') {
      this.appointmentService
        .updateAppointment(parseInt(this.id), this.appointment)
        .subscribe({
          next: (res: Appointment) => (this.appointment = res),
          error: (error) => console.log(error),
          complete: () => this.router.navigate(['/']),
        });
    } else {
      this.appointmentService.addAppointment(this.appointment).subscribe({
        next: (res: Appointment) => (this.appointment = res),
        error: (error) => console.log(error),
        complete: () => this.router.navigate(['/']),
      });
    }
  }
}
