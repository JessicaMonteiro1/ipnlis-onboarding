import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users.model';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addgestorProjetoRequest: Users = {
    userID: '',
    userNome: '',
    role: 'Gestor Projeto',
    email: '',
    telefone: ''
  };

  constructor(private gestorProjetoService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }


  addGestorProjeto() {
    this.gestorProjetoService.addGestorProjeto(this.addgestorProjetoRequest)
      .subscribe({
        next: (gestor) => {
          this.router.navigate(['UtilizadoresDto']);
        }
      });
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
