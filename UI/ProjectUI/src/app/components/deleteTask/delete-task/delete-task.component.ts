import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model'; 
import { Tarefas } from 'src/app/models/tarefas.model';
import { TasksService } from 'src/app/services/tasks.service';
import { Projects } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  tarefasDetails: Tarefas ={
    tarefaID: '',
    tarefaNome: '',
    userNome: '',
    projetoNome: '',
    estado: '',
    dataInicio: null,
    dataLimite: null
  };

  public role:string = "";
  public userNome:string = "";

  constructor(private api: UsersService, private projetosService: ProjectsService, private auth : AuthService, private userStore: UserStoreService, private router: Router, private tarefasService: TasksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.tarefasService.getTarefa(id)
          .subscribe({
            next: (response) => {
              this.tarefasDetails = response;
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
  }


  deleteTarefa(id: string){
    this.tarefasService.deleteTarefa(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['Tarefas']);
      }
    });
  }


  logout(){
    this.auth.signOut();
  }

}
