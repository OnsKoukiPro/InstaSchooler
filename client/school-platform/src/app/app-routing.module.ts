import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddStudentComponent } from './pages/addstudent/addstudent.component';
import { AddTeacherComponent } from './pages/addteacher/addteacher.component';
import { AddClassComponent } from './pages/addclass/addclass.component';
import { ListStudentsComponent } from './pages/liststudents/liststudents.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'student/add-student', component: AddStudentComponent },
  { path: 'student/list', component: ListStudentsComponent },
  { path: 'teacher/add-teacher', component: AddTeacherComponent },
  { path: 'class/add-class', component: AddClassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
