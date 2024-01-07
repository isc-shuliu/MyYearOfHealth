import { Component } from '@angular/core';
import { DescriptionViewComponent } from '../description-view/description-view.component';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [DescriptionViewComponent],
  templateUrl: './description.component.html'
})
export class DescriptionComponent {}
