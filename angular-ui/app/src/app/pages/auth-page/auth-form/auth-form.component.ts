import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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
export class AuthFormComponent {
  @Output() onSignin = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  public hide = true;

  authForm = this.fb.group({
    phone: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(15)]
    ]
  });

  public submitForm(): void {
    this.onSignin.emit(this.authForm.value);
  }
}
