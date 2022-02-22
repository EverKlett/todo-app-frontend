import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Todo } from '../Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = 'http://localhost:3000/api/v1/todo';

  constructor(private http: HttpClient) { }

  //Functionalities
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodo(todo: Todo): Observable<Todo[]> {
    const url: string = `${this.apiUrl}/${todo.id}`;
    return this.http.get<Todo[]>(url);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url: string = `${this.apiUrl}/${todo.id}`;
    return this.http.delete<Todo>(url);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url: string = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Todo>(
      url,
      {
      "task": todo.task,
      "isDone": Number(todo.isDone)
      },
      httpOptions);
  }

  createTodo(todo: Todo) {
    return this.http.post<Todo>(this.apiUrl, todo);
  }
}
