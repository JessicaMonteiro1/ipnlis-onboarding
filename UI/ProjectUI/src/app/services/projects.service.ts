import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Projects } from '../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllProjetos(): Observable<Projects[]>
  {
    return this.http.get<Projects[]>(this.baseUrl + '/api/Projetos');
  }


  addProjeto(addProjetoRequest: Projects): Observable<Projects>
  {
    addProjetoRequest.projetoID = '00000000-0000-0000-0000-000000000000'
    return this.http.post<Projects>(this.baseUrl + '/api/Projetos', addProjetoRequest);
  }


  getProjeto(id: string): Observable<Projects>
  {
    return this.http.get<Projects>(this.baseUrl + '/api/Projetos/' + id);
  }


  updateProjeto(id: string, updateProjetoRequest: Projects): Observable<Projects>
  {
    return this.http.put<Projects>(this.baseUrl + '/api/Projetos/' + id, updateProjetoRequest);
  }


  deleteProjeto(id: string):Observable<Projects>
  {
    return this.http.delete<Projects>(this.baseUrl + '/api/Projetos/' + id);
  }
}
