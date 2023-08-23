import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  public role:string = "";
  public userNome:string = ""

  userDetails: Users = {
    userID: '',
    userNome: '',
    role: '',
    email: '',
    telefone: ''
  };

  constructor(private api: UsersService, private auth : AuthService, private userStore: UserStoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.api.getUser(id)
          .subscribe({
            next: (response) => {
              this.userDetails = response;
            }
          });
        }
      }
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


  deleteUser(id: string){
    this.api.deleteUser(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['UtilizadoresDto']);
      }
    });
  }

  logout(){
    this.auth.signOut();
  }

}
