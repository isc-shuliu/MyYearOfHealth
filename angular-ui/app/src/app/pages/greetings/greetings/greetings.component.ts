import { Component } from '@angular/core';
import { GreetingsViewComponent } from '../greetings-view/greetings-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings',
  standalone: true,
  imports: [GreetingsViewComponent],
  templateUrl: './greetings.component.html'
})
export class GreetingsComponent {
  constructor(private router: Router) {}

  public setGoals() {
    this.router.navigate(['/user-info']);
  }
}
