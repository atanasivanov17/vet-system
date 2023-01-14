import { Appointment } from './../dto/appointment.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointment!: Appointment;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      animalType: ['Dog', [Validators.required]],
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern('^[0-9]*[a-zA-Z]$')]],
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
      appointmentDate: ['', [Validators.required]],
      appointmentTime: ['', [Validators.required]],
      appointmentDuration: ['10', [Validators.required]],
      reasonForAppointment: ['', [Validators.required]],
      vetNotes: [],
    });
  }
  
  submitForm() {
    let date: string = this.appointmentForm.controls['appointmentDate'].value;
    this.appointmentForm.controls['appointmentDate'].setValue(formatDate(date,'dd/MM/yyyy','en'));

    this.appointment = this.appointmentForm.value;
    this.appointmentService.addAppointment(this.appointment).subscribe({
      next: (res: Appointment) => (this.appointment = res),
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    });
  }
}
