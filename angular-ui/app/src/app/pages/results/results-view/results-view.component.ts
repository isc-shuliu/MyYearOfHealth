import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICustomObservationResult } from '../../../share/interfaces/observation.interface.';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';

@Component({
  selector: 'app-results-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, SetBtnComponent],
  templateUrl: './results-view.component.html',
  styleUrl: './results-view.component.scss'
})
export class ResultsViewComponent implements OnInit {
  ngOnInit(): void {
    this.userCustomObservationData = [
      {
        name: 'Body Height',
        code: 'string',
        value: 'value',
        date: '2024-01-22'
      },
      {
        name: 'Blood pressure',
        code: 'string',
        value: 'value',
        date: '2024-01-22'
      },
      {
        name: 'Body Height',
        code: 'string',
        value: 'value',
        date: '2024-01-22'
      },
      {
        name: 'Blood pressure',
        code: 'string',
        value: 'value',
        date: '2024-01-22'
      }
    ];
  }
  @Input() userCustomObservationData: ICustomObservationResult[] | null;

  public btnTitle = 'Ok.Go Ahead';

  @Output() goToMenu = new EventEmitter<any>();
}
