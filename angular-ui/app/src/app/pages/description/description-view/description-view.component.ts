import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICustomCarePlanItem } from '../../../share/interfaces/carePlan.interface';
import { MatCardModule } from '@angular/material/card';
import { WrongDataComponent } from '../../../components/wrong-data/wrong-data.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-description-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, WrongDataComponent],
  templateUrl: './description-view.component.html',
  styleUrl: './description-view.component.scss'
})
export class DescriptionViewComponent {
  public btnTitle = 'Make it real';

  public wrongMessage =
    'Currently, there is no information available about this user Care Plan';

  public icon: string = 'self_improvement';

  public alertMessage: string = 'A Care Plan is not present';

  @Input() carePlanItems: ICustomCarePlanItem[] | null;

  @Output() createOwnPlan = new EventEmitter<any>();
}
