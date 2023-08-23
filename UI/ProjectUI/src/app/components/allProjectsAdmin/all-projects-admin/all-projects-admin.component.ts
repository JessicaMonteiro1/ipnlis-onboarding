import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model'; 
import { Projects } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-projects-admin',
  templateUrl: './all-projects-admin.component.html',
  styleUrls: ['./all-projects-admin.component.css']
})
export class AllProjectsAdminComponent implements OnInit {

  public role:string = "";
  public userNome:string = "";

  addProjectRequest: Projects = {
    projetoID: '',
    projetoNome: '',
    userNome: '',
    estado: '',
    orcamento: 0,
    clienteNome: ''
  };

  projects: Projects[] = [];

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

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    this.userStore.getNameFromStore()
    .subscribe(val=>{
      const nomeFromToken = this.auth.getNameFromToken();
      this.userNome = val || nomeFromToken;
    })
  }


  logout(){
    this.auth.signOut();
  }

}
