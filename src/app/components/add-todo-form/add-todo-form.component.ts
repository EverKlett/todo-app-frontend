import { animate, AnimationEvent, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/Todo';
import { FadeState } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css'],
  animations: [
    trigger(
      'state', [
        state(
          'visible',
          style({

          }),
        ),
        state(
          'hidden',
          style({

          }),
        ),
        transition('* => visible', [animate('500ms ease-in', keyframes([
          style({ height: 0, opacity: 0}),
          style({ height: 196}),
          style({ opacity: 1}),
        ]))]),
        transition('visible => hidden', [animate('500ms ease-in', keyframes([
          style({ height: 196, opacity: 1}),
          style({ opacity: 0}),
          style({ height: 0}),
        ]))]),
      ]
    )
  ]
})
export class AddTodoFormComponent implements OnInit {

  state: FadeState = 'hidden';

  @Output()
  onTodoAdded = new EventEmitter<Todo>();

  isActive: Boolean = false;

  constructor(private todoService: TodoService, private eventService: EventService) { }

  ngOnInit(): void {
  }

  // State
  changeState(event: AnimationEvent) {
    if (event.fromState === 'visible' && event.toState === 'hidden') {
      this.isActive = false;
    }
  };

  // Functionalities
  onAddTodo(todo: Todo) {
    this.todoService.createTodo(todo).subscribe((t) => {
      this.onTodoAdded.emit(t);
      this.eventService.emitEvent({ name: "addedTodo" });
    });
    this.state = 'hidden';
  }

  onToggleButton() {
    if (this.state === 'visible') {
      this.state = 'hidden';
    } else {
      this.isActive = true;
      this.state = 'visible';
    };
  }
}
