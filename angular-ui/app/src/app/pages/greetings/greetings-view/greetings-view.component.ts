import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-greetings-view',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './greetings-view.component.html',
  styleUrl: './greetings-view.component.scss'
})
export class GreetingsViewComponent {
  public btnTitle = 'Start journey';

  @Output() setGoals = new EventEmitter<any>();
}
