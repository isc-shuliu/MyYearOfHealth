import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function textValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const nameRegexp = /^[a-zA-Z0-9 '.-]*$/;

    const textIsValid = nameRegexp.test(value);

    return textIsValid ? null : { latinCharactersOnly: true };
  };
}
