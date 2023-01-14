import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AppointmentGuard } from './services/appointment.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'appointment-list',
    component: AppointmentListComponent,
    canActivate: [AppointmentGuard],
  },
  {
    path: 'add-appointment',
    component: AddAppointmentComponent,
    canActivate: [AppointmentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
