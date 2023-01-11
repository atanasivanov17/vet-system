import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'appointment-list', component: AppointmentListComponent },
  { path: 'add-appointment', component: AddAppointmentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
