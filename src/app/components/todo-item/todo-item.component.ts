import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/app/Todo';

export type FadeState = 'visible' | 'hidden';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [
    trigger('state',[
      state(
        'visible',
        style({
          opacity: 1
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0
        })
      ),
      transition('* => visible', [animate('500ms ease-out')]),
      transition('visible => hidden', [animate('500ms ease-out')])
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {

  faTimes = faTimes;

  state: FadeState = 'visible';

  private _show: Boolean = true;

  get show() {
    return this._show;
  };

  // INPUT
  @Input()
  todo!: Todo;

  @Input()
  set show( value: Boolean) {
    if (value) {
      // show the value and then change the state to visible, triggering the fade in animation
      this._show = value;
      this.state = 'visible';
    } else {
      // Trigger the fade out animation
      this.state = 'hidden';
    }
  };

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

  // State change
  animationDone(event: AnimationEvent) {
    //if (event.fromState === 'visible' && event.toState === 'hidden') {
    //  this._show = false;
    //}
  };

  // Functionalities
  onDelete(todo: Todo) {
    console.log("entrou no onDelete do todo-item.component");
    this.onDeleteTodo.emit(todo);
  }

  onToggle() {
    this.onToggleTodo.emit(this.todo);
  }
}
