import { animate, AnimationEvent, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/app/Todo';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

export type FadeState = 'visible' | 'hidden';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit{

  faTimes = faTimes;

  @Input()
  todo!: Todo;

  // OUTPUT
  @Output()
  onDeleteTodo: EventEmitter<Todo> = new EventEmitter();

  @Output()
  onToggleTodo: EventEmitter<Todo> = new EventEmitter();

  public updatedAt?: Date;

  constructor() { }

  ngOnInit(): void {
    if (this.todo.updatedAt && this.todo.updatedAt !== '' ) {
      this.updatedAt = new Date(this.todo.updatedAt);
    }
  }

  // Functionalities
  onDelete() {
    this.onDeleteTodo.emit(this.todo);
  }

  onToggle() {
    this.onToggleTodo.emit(this.todo);
  }
}
