import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICustomObservationResult } from '../../../share/interfaces/observation.interface.';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';
import { WrongDataComponent } from '../../../components/wrong-data/wrong-data.component';

@Component({
  selector: 'app-results-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, SetBtnComponent, WrongDataComponent],
  templateUrl: './results-view.component.html',
  styleUrl: './results-view.component.scss'
})
export class ResultsViewComponent {
  @Input() userCustomObservationData: ICustomObservationResult[] | null;

  public btnTitle = 'Ok.Go Ahead';

  @Output() goToMenu = new EventEmitter<any>();
}
