import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { EncryptionService } from '../services/encryption.service';
import { Workbook } from 'exceljs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';

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

  humanize(input: string): string {
    return input
      .replace(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/g, ' ')
      .replace(/^(.)/, (x) => x[0].toUpperCase());
  }

  exportExcel(): void {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet('AppointmentsSheet');

    let headers = Object.keys(this.appointments[0]).map((header) =>
      this.humanize(header)
    );
    let headerRow = worksheet.addRow(headers);

    headerRow.eachCell((cell, number) => {
      cell.font = {
        bold: true,
        size: 12,
      };
    });

    this.appointments.forEach((x) => {
      let row = worksheet.addRow(Object.values(x));
      const currentDate = new Date();
      let date = x.appointmentDate.split('/');
      const appointmentDate = new Date(
        `${date[2]}-${date[1]}-${date[0]} ${x.appointmentTime}`
      );
      if (appointmentDate > currentDate) {
        row.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF00' },
          };
        });
      }
    });

    const fileName: string = 'CurrentAppointmentsSheet.xlsx';
    workbook.xlsx.writeBuffer().then((data) => {
      saveAs(new Blob([data], { type: 'application/octet-stream' }), fileName);
    });
  }

  exportPdf(): void {
    var doc = new jsPDF('p', 'mm', 'a3');
    let headers = Object.keys(this.appointments[0]).map((header) =>
      this.humanize(header)
    );

    let rows: any = [];

    this.appointments.forEach((x) => {
      rows.push(Object.values(x));
    });

    autoTable(doc, {
      theme: 'grid',
      headStyles: { fillColor: [0, 150, 255] },
      head: [headers],
      body: rows,
      didParseCell: (data) => {
        const date = data.row.cells[7].text[0].split("/");
        const time = data.row.cells[8].text[0];
        const currentDate = new Date();
        const appointmentDate = new Date(
          `${date[2]}-${date[1]}-${date[0]} ${time}`
        );

        if(appointmentDate > currentDate)
          data.cell.styles.fillColor = "#AAFF00";
     }
    });

    doc.save('CurrentAppointmentsSheet.pdf');
  }
}
