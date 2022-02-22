import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todo!: Todo;

  @Output()
  onDeleteTodo: EventEmitter<Todo> = new EventEmitter();

  @Output()
  onToggleTodo: EventEmitter<Todo> = new EventEmitter();

  public updatedAt?: Date;

  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
    if (this.todo.updatedAt && this.todo.updatedAt !== '' ) {
      this.updatedAt = new Date(this.todo.updatedAt);
    }
  }

  // Functionalities
  onDelete(todo: Todo) {
    console.log("entrou no onDelete do todo-item.component");
    this.onDeleteTodo.emit(todo);
  }

  onToggle() {
    this.onToggleTodo.emit(this.todo);
  }
}
