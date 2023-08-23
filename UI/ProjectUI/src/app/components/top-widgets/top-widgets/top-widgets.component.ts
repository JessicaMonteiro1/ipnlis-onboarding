import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model'; 
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent implements OnInit {
  totalUsers: number = 0;
  totalProjetos: number = 0;
  totalTarefas: number = 0;
  totalProgramadores: number = 0;

  public role:string = "";

  constructor(private api: UsersService, private auth : AuthService, private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })

    this.api.getTotalUsers().subscribe((response: any) => {
      this.totalUsers = response.totalUsers;
    })

    this.api.getTotalProjetos().subscribe((response: any) => {
      this.totalProjetos = response.totalProjetos;
    })

    this.api.getTotalTarefas().subscribe((response: any) => {
      this.totalTarefas = response.totalTarefas;
    })

    this.api.getTotalProgramadores().subscribe((response: any) => {
      this.totalProgramadores = response.totalProgramadores;
    })

    


  }

  }