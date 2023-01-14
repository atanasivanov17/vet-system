export class Appointment {
  private _appointmentId: number;
  private _patientName: string;
  private _animalType: string;
  private _ownerIdCardNumber: string;
  private _ownerName: string;
  private _ownerSurname: string;
  private _ownerContactNumber: string;
  private _appointmentDate: string;
  private _appointmentTime: string;
  private _appointmentDuration: number;
  private _reasonForAppointment: string;
  private _vetNotes: string;

  constructor(
    appointmentId: number,
    patientName: string,
    animalType: string,
    ownerIdCardNumber: string,
    ownerName: string,
    ownerSurname: string,
    ownerContactNumber: string,
    appointmentDate: string,
    appointmentTime: string,
    appointmentDuration: number,
    reasonForAppointment: string,
    vetNotes: string
  ) {
    this._appointmentId = appointmentId;
    this._patientName = patientName;
    this._animalType = animalType;
    this._ownerIdCardNumber = ownerIdCardNumber;
    this._ownerName = ownerName;
    this._ownerSurname = ownerSurname;
    this._ownerContactNumber = ownerContactNumber;
    this._appointmentDate = appointmentDate;
    this._appointmentTime = appointmentTime;
    this._appointmentDuration = appointmentDuration;
    this._reasonForAppointment = reasonForAppointment;
    this._vetNotes = vetNotes;
  }

  
  public get appointmentId() : number {    
    return this._appointmentId;
  }

  
  public get patientName() : string {
    return this._patientName;
  }

  
  public get animalType() : string {
    return this._animalType;
  }
  

  
  public get ownerIdCardNumber() : string {
    return this._ownerIdCardNumber;
  }

  
  public get ownerName() : string {
    return this._ownerName;
  }

  
  public get ownerSurname() : string {
    return this._ownerSurname;
  }
  
  
  public get ownerContactNumber() : string {
    return this._ownerContactNumber;
  }
  
  
  public get appointmentDate() : string {
    return this._appointmentDate;
  }
  
  
  public get appointmentTime() : string {
    return this._appointmentTime;
  }
  
  
  public get appointmentDuration() : number {
    return this._appointmentDuration;
  }

  
  public get reasonForAppointment() : string {
    return this._reasonForAppointment;
  }
  
  
  public get vetNotes() : string {
    return this._vetNotes;
  }

  
  public set appointmentDate(value : string) {
    this._appointmentDate = value;
  }

}
