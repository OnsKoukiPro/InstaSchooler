import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  // Ensure this path is correct

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarHidden = false;

  constructor(
    private router: Router,
    private authService: AuthService  // Inject AuthService
  ) {}

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateToStudents() {
    this.router.navigate(['dashboard/student/liststudents']);
  }

  navigateToTeachers() {
    this.router.navigate(['dashboard/teacher/listteachers']);
  }

  navigateToDashboard() {
    this.router.navigate(['dashboard/overview']);
  }

  navigateToClasses() {
    this.router.navigate(['dashboard/class/listclasses']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['dashboard/auth/login']);
  }
}
