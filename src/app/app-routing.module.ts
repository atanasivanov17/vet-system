import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentGuard } from './services/appointment.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'appointments',
    component: AppointmentListComponent,
    canActivate: [AppointmentGuard],
  },
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  {
    path: 'add',
    component: AppointmentFormComponent,
    canActivate: [AppointmentGuard],
  },
  {
    path: 'update/:id',
    component: AppointmentFormComponent,
    canActivate: [AppointmentGuard],
  },
  {
    path: 'appointments/:id',
    component: AppointmentDetailsComponent,
    canActivate: [AppointmentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
