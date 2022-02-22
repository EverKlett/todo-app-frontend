import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: BehaviorSubject<Todo[]>;

  constructor(private todoService: TodoService) {
    let list: Todo[] = [];
    this.todos = new BehaviorSubject<Todo[]>(list);
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos.next(todos)));
  }

  //Functionalities
  onDeleteTodo(todo: Todo) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(() => (
        this.todoService.getTodos().subscribe((todos) => (this.todos.next(todos)) )
      ));
  }

  onToggleTodo(todo: Todo) {
    todo.isDone = (todo.isDone == 1) ? 0 : 1;

    this.todoService
      .updateTodo(todo)
      .subscribe((todoUpd) => {
        let array: Todo[] = this.todos
          .getValue()
          .map<Todo>((t) => {
            if (t.id === todoUpd.id) {
              t = todoUpd;
            };
            return t;
          });

        this.todos.next(array);
      }
    );
  }

  onAddTodo(todo: Todo) {
    this.todoService.createTodo(todo).subscribe(() => (
      this.todoService.getTodos().subscribe((todos) => (this.todos.next(todos)) )
    ));
  }

}
