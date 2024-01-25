import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-about-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {
  constructor(
    private router: Router,
    private clipboard: Clipboard
  ) {}
  public isUser: boolean;
  ngOnInit(): void {
    this.isUser = !!localStorage.getItem('user');
  }
  @Input() isUserLogin: boolean | null;

  public logIn() {
    this.router.navigate(['/autn']);
  }

  public clickGitClone() {
    this.clipboard.copy(
      'git clone https://github.com/banksiaglobal/MyYearOfHealth'
    );
  }

  public clickDockerCommand() {
    this.clipboard.copy('docker compose up -d --build');
  }
}
