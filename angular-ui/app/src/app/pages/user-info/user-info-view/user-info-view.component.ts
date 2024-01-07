import { Component, EventEmitter, Output } from '@angular/core';
import { SetBtnComponent } from '../../../components/set-btn/set-btn.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-info-view',
  standalone: true,
  imports: [
    SetBtnComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-info-view.component.html',
  styleUrl: './user-info-view.component.scss'
})
export class UserInfoViewComponent {
  public btnTitle = 'Set';
  @Output() setObservationData = new EventEmitter<any>();

  public clickSetObservationData() {
    this.setObservationData.emit('1');
  }

  observationData = new FormControl('');

  observationDataList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato'
  ];

  careData = new FormControl('');

  careDataList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato'
  ];

  @Output() setData = new EventEmitter<any>();

  public setYourSettings() {
    this.setData.emit('set your data');
  }
}
