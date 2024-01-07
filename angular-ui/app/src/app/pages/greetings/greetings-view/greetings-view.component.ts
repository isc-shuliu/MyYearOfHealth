import { Component, EventEmitter, Output } from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';

@Component({
  selector: 'app-greetings-view',
  standalone: true,
  imports: [SetBtnComponent],
  templateUrl: './greetings-view.component.html',
  styleUrl: './greetings-view.component.scss'
})
export class GreetingsViewComponent {
  public btnTitle = 'Set your goals';

  @Output() setGoals = new EventEmitter<any>();
}
