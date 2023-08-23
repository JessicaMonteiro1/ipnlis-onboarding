import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model'; 
import { Projects } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {


  projects: Projects[] = [];;
  
  public role:string = "";

  constructor(private api: UsersService, private projetosService: ProjectsService, private auth : AuthService, private userStore: UserStoreService, private router: Router) { }

  ngOnInit(): void {
    this.projetosService.getAllProjetos()
    .subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }


    

}
