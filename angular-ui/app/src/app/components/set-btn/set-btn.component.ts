import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-set-btn',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './set-btn.component.html',
  styleUrl: './set-btn.component.scss'
})
export class SetBtnComponent {
  @Input() btnTitle = '';
}
