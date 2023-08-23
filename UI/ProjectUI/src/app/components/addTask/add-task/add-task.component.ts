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
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public role:string = "";
  public userNome:string = "";

  addTarefaRequest: Tarefas = {
    tarefaID: '',
    tarefaNome: '',
    userNome: '',
    projetoNome: '',
    estado: '',
    dataInicio: null,
    dataLimite: null
  };
  
  programadores: string[] = [];
  projetos: string[] = [];

  constructor(private api: UsersService, private projetosService: ProjectsService, private auth : AuthService, private userStore: UserStoreService, private router: Router, private tarefasService: TasksService) { }

    ngOnInit(): void {
      this.api.getAllUsers().subscribe((users: Users[]) => {
        this.programadores = users.filter(user => user.role === "Programador" || user.role === "Developer").map(programador => programador.userNome);
      });
      this.projetosService.getAllProjetos().subscribe((projetos: Projects[]) => {
        this.projetos = projetos.map(projeto => projeto.projetoNome);
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

    addTarefa(){
      this.tarefasService.addTarefa(this.addTarefaRequest)
      .subscribe({
        next: (tarefa) => {
          this.router.navigate(['Tarefas']);
        }
      });
    }
  
    isDataInicioBeforeToday(): boolean {
      if (!this.addTarefaRequest.dataInicio) {
        return false;
      }
    
      const dataInicioDate = new Date(this.addTarefaRequest.dataInicio);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    
      return dataInicioDate < today;
    }
  
    isDataLimiteBeforeDataInicio(): boolean {
      if (!this.addTarefaRequest.dataLimite || !this.addTarefaRequest.dataInicio) {
        return false;
      }
    
      const dataLimiteDate = new Date(this.addTarefaRequest.dataLimite);
      const dataInicioDate = new Date(this.addTarefaRequest.dataInicio);
    
      return dataLimiteDate < dataInicioDate;
    }

    logout(){
      this.auth.signOut();
    }

}
