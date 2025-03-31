import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = '';
  projects: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Ensure we are running in the browser before accessing localStorage
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username');
      if (!this.username) {
        this.router.navigate(['/login']);
        return;
      }

      // ✅ Load user-specific projects
      const savedProjects = localStorage.getItem(`projects_${this.username}`);
      this.projects = savedProjects ? JSON.parse(savedProjects) : [];
    }
  }

  // ✅ Compute total pending tasks dynamically
  get totalPending(): number {
    return this.projects.reduce((sum, p) => sum + (p.tasks?.pending || 0), 0);
  }

  // ✅ Compute total in-progress tasks dynamically
  get totalInProgress(): number {
    return this.projects.reduce((sum, p) => sum + (p.tasks?.inProgress || 0), 0);
  }

  // ✅ Compute total completed tasks dynamically
  get totalCompleted(): number {
    return this.projects.reduce((sum, p) => sum + (p.tasks?.completed || 0), 0);
  }

  addProject() {
    if (typeof window === 'undefined') return;

    const title = prompt('Enter project title:');
    if (!title) return;

    const newProject = {
      id: Date.now(),
      title,
      manager: this.username,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      tasks: { pending: 0, inProgress: 0, completed: 0 }
    };

    this.projects.push(newProject);
    localStorage.setItem(`projects_${this.username}`, JSON.stringify(this.projects));
  }

  viewProject(id: number) {
    this.router.navigate(['/projects', id]);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
    }
  }

  toggleDarkMode() {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle('dark-mode');
    }
  }
}
