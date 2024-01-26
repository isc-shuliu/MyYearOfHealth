import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomObservationResult } from '../../../share/interfaces/observation.interface.';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { WrongDataComponent } from '../../../components/wrong-data/wrong-data.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-results-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, WrongDataComponent],
  templateUrl: './results-view.component.html',
  styleUrl: './results-view.component.scss'
})
export class ResultsViewComponent {
  @Input() userCustomObservationData: ICustomObservationResult[] | null;

  public btnTitle = 'Ok.Go Ahead';
  public wrongMessage =
    'Currently, there is no information available about this user Observation Data';

  public icon: string = 'work_alert';

  public alertMessage: string = 'An Observation Data is not present';

  @Output() goToMenu = new EventEmitter<any>();
}
