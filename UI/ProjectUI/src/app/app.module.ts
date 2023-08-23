
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule} from '@angular/core';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HeaderComponent } from './components/header/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav/side-nav.component';
import { MainComponent } from './components/main/main/main.component';
import { TopWidgetsComponent } from './components/top-widgets/top-widgets/top-widgets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AllUsersComponent } from './components/allUsers/all-users/all-users.component';
import { AllProjectsComponent } from './components/allProjects/all-projects/all-projects.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AllUsersAdminComponent } from './components/allUsersAdmin/all-users-admin/all-users-admin.component';
import { EditUserComponent } from './components/editUser/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/deleteUser/delete-user/delete-user.component';
import { AllProjectsAdminComponent } from './components/allProjectsAdmin/all-projects-admin/all-projects-admin.component';
import { AddProjectComponent } from './components/addProject/add-project/add-project.component';
import { AddUserComponent } from './components/addUser/add-user/add-user.component';
import { EditProjectComponent } from './components/editProject/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/deleteProject/delete-project/delete-project.component';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { AddTaskComponent } from './components/addTask/add-task/add-task.component';
import { EditTaskComponent } from './components/editTask/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/deleteTask/delete-task/delete-task.component';
import { AllTasksProgComponent } from './components/allTasksProg/all-tasks-prog/all-tasks-prog.component';
import { EditTaskProgComponent } from './components/editTaskProg/edit-task-prog/edit-task-prog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    TopWidgetsComponent,
    AllUsersComponent,
    AllProjectsComponent,
    AllTasksComponent,
    AllUsersAdminComponent,
    EditUserComponent,
    DeleteUserComponent,
    AllProjectsAdminComponent,
    AddProjectComponent,
    AddUserComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    HomepageComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    AllTasksProgComponent,
    EditTaskProgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpTranslateLoader,
        deps:[HttpClient]
      }
    })

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http)
}
