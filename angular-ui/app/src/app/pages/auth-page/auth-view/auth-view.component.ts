import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-view',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  templateUrl: './auth-view.component.html',
  styleUrl: './auth-view.component.scss'
})
export class AuthViewComponent {
  @Input() currentUser: any;

  @Output() onSignin = new EventEmitter<any>();

  @Output() onGoToAboutPage = new EventEmitter<Event>();

  @Output() onGoToOppositeForm = new EventEmitter<Event>();

  public titleLink = 'Sign up';

  public instruction = 'Do not have an account?';
}
