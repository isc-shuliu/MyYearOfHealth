import { Component } from '@angular/core';
import { ResultsViewComponent } from '../results-view/results-view.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ResultsViewComponent],
  templateUrl: './results.component.html'
})
export class ResultsComponent {}
