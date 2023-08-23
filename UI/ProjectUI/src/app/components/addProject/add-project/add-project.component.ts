import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projects } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public role:string = "";
  public userNome:string = "";

  addProjetoRequest: Projects = {
    projetoID: '',
    projetoNome: '',
    userNome: '',
    estado: '',
    orcamento: 0,
    clienteNome: ''
  };

  gestores: string[] = [];

  constructor(private api: UsersService, private auth : AuthService, private userStore: UserStoreService, private projetosService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((users: Users[]) => {
      this.gestores = users.filter(user => user.role === "Gestor Projeto" || user.role === "Project Manager")
                           .map(gestor => gestor.userNome);
    });
  

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

  addProjeto(){
    this.projetosService.addProjeto(this.addProjetoRequest)
    .subscribe({
      next: (projeto) => {
        this.router.navigate(['Projetos']);
      }
    });
  }


  logout(){
    this.auth.signOut();
  }

}
