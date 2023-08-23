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
  selector: 'app-edit-task-prog',
  templateUrl: './edit-task-prog.component.html',
  styleUrls: ['./edit-task-prog.component.css']
})
export class EditTaskProgComponent implements OnInit {

  tarefasDetails: Tarefas ={
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
  public role:string = "";
  public userNome:string = "";

  constructor(private api: UsersService, private projetosService: ProjectsService, private auth : AuthService, private userStore: UserStoreService, private router: Router, private tarefasService: TasksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.tarefasService.getTarefa(id).subscribe({
            next: (response) => {
              this.tarefasDetails = response;
            }
          });
        }
      }
    });

    this.api.getAllUsers().subscribe((users: Users[]) => {
      this.programadores = users.filter(user => user.role === "Programador" || user.role === "Developer").map(programador => programador.userNome);
    });

    this.projetosService.getAllProjetos().subscribe({
      next: (projetos) => {
        this.projetos = projetos.map((projeto) => projeto.projetoNome);
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

  updateTarefa(){
    this.tarefasService.updateTarefa(this.tarefasDetails.tarefaID, this.tarefasDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['dashboard']);
      }
    });
  }


  isDataInicioBeforeToday(): boolean {
    if (!this.tarefasDetails.dataInicio) {
      return false;
    }
  
    const dataInicioDate = new Date(this.tarefasDetails.dataInicio);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return dataInicioDate < today;
  }

  isDataLimiteBeforeDataInicio(): boolean {
    if (!this.tarefasDetails.dataLimite || !this.tarefasDetails.dataInicio) {
      return false;
    }
  
    const dataLimiteDate = new Date(this.tarefasDetails.dataLimite);
    const dataInicioDate = new Date(this.tarefasDetails.dataInicio);
  
    return dataLimiteDate < dataInicioDate;
  }

  logout(){
    this.auth.signOut();
  }

}

