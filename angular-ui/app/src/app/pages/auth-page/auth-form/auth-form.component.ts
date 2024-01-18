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
      // Если есть ошибка с бэкенда, обновим статус валидации для поля telecom
      const telecomControl = this.authForm.get('telecom');

      if (telecomControl !== null) {
        telecomControl.updateValueAndValidity();
        this.cdr.detectChanges(); // Запрос обновления вида
      }
    }
  }

  public hide = true;

  authForm = this.fb.group({
    telecom: ['', Validators.required]
  });

  public submitForm(): void {
    this.onSignin.emit(this.authForm.value);
  }
}
