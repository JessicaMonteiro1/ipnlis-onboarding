import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tarefas } from '../models/tarefas.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllTarefas(): Observable<Tarefas[]>
  {
    return this.http.get<Tarefas[]>(this.baseUrl + '/api/Tarefas');
  }

  addTarefa(addTarefaRequest: Tarefas): Observable<Tarefas>
  {
    addTarefaRequest.tarefaID = '00000000-0000-0000-0000-000000000000'
    return this.http.post<Tarefas>(this.baseUrl + '/api/Tarefas', addTarefaRequest);
  }

  getTarefa(id: string): Observable<Tarefas>
  {
    return this.http.get<Tarefas>(this.baseUrl + '/api/Tarefas/' + id);
  }

  updateTarefa(id: string, updateTarefaRequest: Tarefas): Observable<Tarefas>
  {
    return this.http.put<Tarefas>(this.baseUrl + '/api/Tarefas/' + id, updateTarefaRequest);
  }

  deleteTarefa(id: string):Observable<Tarefas>
  {
    return this.http.delete<Tarefas>(this.baseUrl + '/api/Tarefas/' + id);
  }
}
