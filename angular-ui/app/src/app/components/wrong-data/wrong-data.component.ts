import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wrong-data',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './wrong-data.component.html',
  styleUrl: './wrong-data.component.scss'
})
export class WrongDataComponent {
  @Input() wrongMessage: string;
  @Input() icon: string;
  @Input() alertMessage: string;
}
