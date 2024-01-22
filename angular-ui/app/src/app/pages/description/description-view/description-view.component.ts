import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description-view',
  standalone: true,
  imports: [CommonModule, SetBtnComponent],
  templateUrl: './description-view.component.html',
  styleUrl: './description-view.component.scss'
})
export class DescriptionViewComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.carePlanItems = changes['carePlanItems'].currentValue;
    }
  }
  public btnTitle = 'Make it real';

  @Input() carePlanItems: { userId: number; carePlan: string }[] | null;

  @Output() createOwnPlan = new EventEmitter<any>();
}
