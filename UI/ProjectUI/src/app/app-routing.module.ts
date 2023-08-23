import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './components/guards/auth.guard';
import { AllUsersAdminComponent } from './components/allUsersAdmin/all-users-admin/all-users-admin.component';
import { EditUserComponent } from './components/editUser/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/deleteUser/delete-user/delete-user.component';
import { AllProjectsAdminComponent } from './components/allProjectsAdmin/all-projects-admin/all-projects-admin.component';
import { AddProjectComponent } from './components/addProject/add-project/add-project.component';
import { EditProjectComponent } from './components/editProject/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/deleteProject/delete-project/delete-project.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AddTaskComponent } from './components/addTask/add-task/add-task.component';
import { EditTaskComponent } from './components/editTask/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/deleteTask/delete-task/delete-task.component';
import { EditTaskProgComponent } from './components/editTaskProg/edit-task-prog/edit-task-prog.component';



const routes: Routes = [
{path:'', component: HomepageComponent},
{path:'login', component: LoginComponent},
{path:'signup', component: SignupComponent},
{path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
{path:'UtilizadoresDto', component: AllUsersAdminComponent, canActivate:[AuthGuard]},
{path:'UtilizadoresDto/edit/:id', component: EditUserComponent, canActivate:[AuthGuard]},
{path:'UtilizadoresDto/delete/:id', component: DeleteUserComponent, canActivate:[AuthGuard]},
{path:'Projetos', component: AllProjectsAdminComponent, canActivate:[AuthGuard]},
{path:'Projetos/add', component: AddProjectComponent, canActivate:[AuthGuard]},
{path:'Projetos/edit/:id', component: EditProjectComponent, canActivate:[AuthGuard]},
{path:'Projetos/delete/:id', component: DeleteProjectComponent, canActivate:[AuthGuard]},
{path:'Tarefas', component: AllTasksComponent, canActivate:[AuthGuard]},
{path:'Tarefas/add', component: AddTaskComponent, canActivate:[AuthGuard]},
{path:'Tarefas/edit/:id', component: EditTaskComponent, canActivate:[AuthGuard]},
{path:'Tarefas/delete/:id', component: DeleteTaskComponent, canActivate:[AuthGuard]},
{path:'Tarefas/editP/:id', component: EditTaskProgComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

