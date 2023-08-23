import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public role:string = "";
  public userNome:string = "";

  constructor(private api: UsersService, private auth : AuthService, private userStore: UserStoreService) { }

  ngOnInit(): void {

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

  isAuthenticated(): boolean {
    return this.auth.isLoggedIn(); // Use o método correto do AuthService
  }

  logout(){
    this.auth.signOut();
  }

}

