import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {
  constructor(private router: Router) {}
  public isUser: boolean;
  ngOnInit(): void {
    this.isUser = !!localStorage.getItem('user');
  }
  @Input() isUserLogin: boolean | null;

  public logIn() {
    this.router.navigate(['/autn']);
  }
}
