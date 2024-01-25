import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  IUserCarePlan,
  IUserData,
  IUserObservationData
} from '../../../share/interfaces/carePlan.interface';
import { MatButtonModule } from '@angular/material/button';
import { WrongDataComponent } from '../../../components/wrong-data/wrong-data.component';

@Component({
  selector: 'app-user-info-view',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    WrongDataComponent
  ],
  templateUrl: './user-info-view.component.html',
  styleUrl: './user-info-view.component.scss'
})
export class UserInfoViewComponent {
  public alertMessage = 'It is not possible to access user data';
  public wrongMessage =
    'Unfortunately, there is no information available regarding this user  ';
  public icon = 'sync_problem';

  @Input() userData: IUserData | null;
  @Input() observationData: IUserObservationData[] | null;
  @Input() planCareData: IUserCarePlan[] | null;

  @Output() setUserSettings = new EventEmitter<any>();

  public observationDataControl = new FormControl('');
  public careDataControl = new FormControl('');

  public isDisabledBtn = true;

  public isButtonDisabled(): boolean {
    if (this.planCareData?.length !== 0 && this.observationData?.length !== 0) {
      return !this.careDataControl.value && !this.observationDataControl.value;
    }
    if (this.planCareData?.length == 0) {
      return (
        !this.observationDataControl.value ||
        this.observationDataControl.value.length === 0
      );
    }
    return true;
  }

  public clickSetUserSettings() {
    const settings = {
      carePlan: this.careDataControl.value,
      observationData: this.observationDataControl.value
    };
    this.setUserSettings.emit(settings);
  }
}
