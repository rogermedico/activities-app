import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password').value;
  const password2 = control.get('repeatPassword').value;
  if (password == null || password == '') return null;
  if (password !== password2) control.get('repeatPassword').setErrors({ passwordMismatch: true });
  return password !== password2 ? { passwordMismatch: true } : null;
}