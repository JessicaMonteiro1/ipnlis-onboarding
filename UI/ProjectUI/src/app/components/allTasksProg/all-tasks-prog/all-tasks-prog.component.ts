import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Tarefas } from 'src/app/models/tarefas.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-all-tasks-prog',
  templateUrl: './all-tasks-prog.component.html',
  styleUrls: ['./all-tasks-prog.component.css']
})
export class AllTasksProgComponent implements OnInit {

  tarefas: Tarefas[] = [];
  userNome: string = '';

  constructor(private auth: AuthService, private userStore: UserStoreService, private tarefasService: TasksService) { }

  ngOnInit(): void {
    this.userStore.getNameFromStore().subscribe(userNome => {
      this.userNome = userNome;
      this.loadTarefas();
    });
  }

  loadTarefas() {
    this.tarefasService.getAllTarefas().subscribe({
      next: (tarefas) => {
        this.tarefas = tarefas.filter(tarefa => tarefa.userNome === this.userNome);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
