import { Component } from '@angular/core';
import { GreetingsViewComponent } from '../greetings-view/greetings-view.component';

@Component({
  selector: 'app-greetings',
  standalone: true,
  imports: [GreetingsViewComponent],
  templateUrl: './greetings.component.html',
  styleUrl: './greetings.component.scss'
})
export class GreetingsComponent {}
