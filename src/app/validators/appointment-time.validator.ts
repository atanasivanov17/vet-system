import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function appointmentDateTimeValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;
        const inputtedDate: Date = new Date(value);
        const today = new Date();

        if(new Date(inputtedDate) >= today) return null;

        return {appointmentDateTimeInvalid: true};
    }
}