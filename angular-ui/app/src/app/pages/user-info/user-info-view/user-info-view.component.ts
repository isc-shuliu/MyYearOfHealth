import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info-view',
  standalone: true,
  imports: [
    SetBtnComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-info-view.component.html',
  styleUrl: './user-info-view.component.scss'
})
export class UserInfoViewComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.carePlanData);
  }

  public btnTitle = 'Set';

  @Input() user: any | null;

  @Input() carePlanData: any;

  @Output() setUserSettings = new EventEmitter<any>();

  public clickSetUserSettings() {
    const settings = {
      carePlan: this.careDataControl.value,
      observationData: this.observationDataControl.value
    };

    this.setUserSettings.emit(settings);
  }

  observationDataControl = new FormControl('');
  careDataControl = new FormControl('');
}
