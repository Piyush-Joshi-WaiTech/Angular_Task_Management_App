import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';

  constructor(private router: Router) {}

  login() {
    if (this.username.trim() !== '') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('username', this.username);
        console.log('✅ Username saved:', this.username); // Debugging
      }
      this.router.navigate(['/projects']);
      console.log('✅ Redirecting to /projects'); // Debugging
    } else {
      alert('Please enter a username.');
    }
  }
}
