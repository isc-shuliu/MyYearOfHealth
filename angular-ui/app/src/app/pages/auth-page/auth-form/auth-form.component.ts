import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent implements OnChanges {
  @Input() formError: boolean = false;

  @Output() onSignin = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges() {
    if (this.formError) {
      const telecomControl = this.authForm.get('phone');

      if (telecomControl !== null) {
        telecomControl.updateValueAndValidity();
        this.cdr.detectChanges();
      }
    }
  }

  public hide = true;

  authForm = this.fb.group({
    phone: ['', Validators.required]
  });

  public submitForm(): void {
    this.onSignin.emit(this.authForm.value);
  }
}
