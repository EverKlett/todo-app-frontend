import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createDefTodo, Todo } from 'src/app/Todo';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Output()
  onAddTodo: EventEmitter<Todo> = new EventEmitter();

  task: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  //Functionalities
  onSubmit() {
    if (!this.task) {
      alert('Please add a task!');
      return;
    };

    const todo: Todo = createDefTodo();
    todo.task = this.task;

    this.onAddTodo.emit(todo);

    this.task = '';
  }

}
