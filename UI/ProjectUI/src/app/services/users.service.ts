import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTotalUsers(){
    return this.http.get<any>(this.baseUrl + '/api/UtilizadoresDto/total-users');
  }

  getTotalProjetos(){
    return this.http.get<any>(this.baseUrl + '/api/UtilizadoresDto/total-projetos');
  }

  getTotalTarefas(){
    return this.http.get<any>(this.baseUrl + '/api/UtilizadoresDto/total-tarefas');
  }

  getTotalProgramadores(){
    return this.http.get<any>(this.baseUrl + '/api/UtilizadoresDto/total-programadores');
  }

  getAllUsers(){
    return this.http.get<any>(this.baseUrl + '/api/UtilizadoresDto');
  }


  getUser(id: string): Observable<Users>
  {
    return this.http.get<Users>(this.baseUrl + '/api/UtilizadoresDto/' + id);
  }

  updateUser(id: string, updateUserRequest: Users): Observable<Users>
  {
    return this.http.put<Users>(this.baseUrl + '/api/UtilizadoresDto/' + id, updateUserRequest);
  }

  deleteUser(id: string):Observable<Users>
  {
    return this.http.delete<Users>(this.baseUrl + '/api/UtilizadoresDto/' + id);
  }


  addGestorProjeto(addGestorProjetoRequest: Users): Observable<Users>
  {
    addGestorProjetoRequest.userID = '00000000-0000-0000-0000-000000000000'
    return this.http.post<Users>(this.baseUrl + '/api/UtilizadoresDto/', addGestorProjetoRequest);
  }
}
