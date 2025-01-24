import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './overview/dashboard-overview.component';
import { AddClassComponent } from '../dashboard/class/addclass/addclass.component';
import { AddStudentComponent } from './student/addstudent/addstudent.component';
import { ListStudentsComponent } from '../dashboard/student/liststudents/liststudents.component';
import { AddTeacherComponent } from './teacher/addteacher/addteacher.component';
import { ListTeachersComponent } from './teacher/listteachers/listteachers.component';
import { ListClassesComponent } from './class/listclasses/listclasses.component';
import { EditstudentComponent } from './student/editstudent/editstudent.component';
import { DashboardLoginComponent } from './auth/login/dashboard-login.component';
import { AuthGuard } from '../dashboard/guards/auth.guard';

const routes: Routes = [
  // Route for Login (no dashboard layout)
  {
    path: 'auth',
    children: [
      { path: 'login', component: DashboardLoginComponent }, // Login route
    ],
  },

  // Main dashboard routes with the default layout (Header, Sidebar, etc.)
  {
    path: '',
    canActivate: [AuthGuard], // Protect these routes
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DashboardOverviewComponent },

      // Routes for Class - Protected by AuthGuard
      {
        path: 'class',
        canActivate: [AuthGuard], // Protect these routes
        children: [
          { path: 'addclass', component: AddClassComponent },
          { path: 'listclasses', component: ListClassesComponent },
        ],
      },

      // Routes for Student - Protected by AuthGuard
      {
        path: 'student',
        canActivate: [AuthGuard], // Protect these routes
        children: [
          { path: 'addstudent', component: AddStudentComponent },
          { path: 'liststudents', component: ListStudentsComponent },
          { path: 'editstudent', component: EditstudentComponent },
        ],
      },

      // Routes for Teacher - Protected by AuthGuard
      {
        path: 'teacher',
        canActivate: [AuthGuard], // Protect these routes
        children: [
          { path: 'addteacher', component: AddTeacherComponent },
          { path: 'listteachers', component: ListTeachersComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
