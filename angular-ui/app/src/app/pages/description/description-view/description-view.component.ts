import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';
import { CommonModule } from '@angular/common';
import { ICustomCarePlanItem } from '../../../share/interfaces/carePlan.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-description-view',
  standalone: true,
  imports: [CommonModule, SetBtnComponent, MatCardModule],
  templateUrl: './description-view.component.html',
  styleUrl: './description-view.component.scss'
})
export class DescriptionViewComponent implements OnInit {
  ngOnInit(): void {
    this.carePlanItems = [
      {
        code: 'string',
        activity: 'string',
        carePlan: 'string',
        start: '2024-01-22',
        goal: 'string'
      },
      {
        code: 'string',
        activity: 'string',
        carePlan: 'string',
        start: '2024-01-22',
        goal: 'string'
      }
    ];
  }

  public btnTitle = 'Make it real';

  @Input() carePlanItems: ICustomCarePlanItem[] | null;

  @Output() createOwnPlan = new EventEmitter<any>();
}
