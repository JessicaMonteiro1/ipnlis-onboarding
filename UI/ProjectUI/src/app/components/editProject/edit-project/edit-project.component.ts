import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projects } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {


  public role:string = "";
  public userNome:string = "";

  projetosDetails: Projects = {
    projetoID: '',
    projetoNome: '',
    userNome: '',
    estado: '',
    orcamento: 0,
    clienteNome: ''
  };


  gestores: string[] = [];


  constructor(private api: UsersService, private auth : AuthService, private userStore: UserStoreService, private projetosService: ProjectsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.projetosService.getProjeto(id).subscribe({
            next: (response) => {
              this.projetosDetails = response;
            }
          });
        }
      }
    });


    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.userStore.getNameFromStore()
    .subscribe(val=>{
      const nomeFromToken = this.auth.getNameFromToken();
      this.userNome = val || nomeFromToken;
    });


    this.api.getAllUsers().subscribe({
      next: (gestores: Users[]) => {
        this.gestores = gestores.map(user => user.userNome);
      }
    });
    
  }


    logout(){
      this.auth.signOut();
    }


    updateProjeto(){
      this.projetosService.updateProjeto(this.projetosDetails.projetoID, this.projetosDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['Projetos']);
        }
      });
    }
  }

