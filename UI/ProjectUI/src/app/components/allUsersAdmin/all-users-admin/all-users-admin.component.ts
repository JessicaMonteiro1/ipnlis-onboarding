import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-all-users-admin',
  templateUrl: './all-users-admin.component.html',
  styleUrls: ['./all-users-admin.component.css']
})
export class AllUsersAdminComponent implements OnInit {

  users: Users[] = [];;
  
  public role:string = "";
  public userNome:string = "";

  constructor(private api: UsersService, private auth : AuthService, private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.api.getAllUsers()
    .subscribe({
      next: (users)=>{
        this.users = users;
      },
      error: (response) =>{
        console.log(response);
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

  logout(){
    this.auth.signOut();
  }

}
