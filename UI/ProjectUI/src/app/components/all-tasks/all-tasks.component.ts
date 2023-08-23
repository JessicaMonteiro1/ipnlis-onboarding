import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model'; 
import { Tarefas } from 'src/app/models/tarefas.model';
import { TasksService } from 'src/app/services/tasks.service';
import { Projects } from 'src/app/models/projects.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  public role:string = "";
  public userNome:string = "";

  tarefas: Tarefas[] = [];

  constructor(private api: UsersService, private projetosService: ProjectsService, private auth : AuthService, private userStore: UserStoreService, private router: Router, private tarefasService: TasksService) { }

  ngOnInit(): void {
    this.tarefasService.getAllTarefas()
    .subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas;
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
