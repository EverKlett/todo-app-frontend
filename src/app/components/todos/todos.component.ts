import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('inOutAnim',[
      transition(':enter', [animate('500ms', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
      ]))]),
      transition(':leave', [animate('500ms', keyframes([
          style({ opacity: 1 }),
          style({ opacity: 0 }),
      ]))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

  todos: BehaviorSubject<Todo[]>;

  constructor(
    private todoService: TodoService,
    private eventService: EventService,
    private changeDetector: ChangeDetectorRef) {
    let list: Todo[] = [];
    this.todos = new BehaviorSubject<Todo[]>(list);

    this.eventService.event.subscribe((event) => {
      if (event.name === "addedTodo") {
        //this.todoService.getTodos().subscribe((todos) => (this.todos.next(todos)));
        this.todos.getValue().push(event.todo);
      }
    })
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos.next(todos)));
  };

  trackByFn(index: number, item: Todo): string {
    return JSON.stringify(item);
  };

  //Functionalities
  onDeleteTodo(todo: Todo) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(() => {
        //this.todoService.getTodos().subscribe((todos) => (this.todos.next(todos)) )
        this.todos.getValue().splice(this.todos.getValue().indexOf(todo), 1);
      });
  };

  onToggleTodo(todo: Todo) {
    todo.isDone = (todo.isDone == 1) ? 0 : 1;

    this.todoService
      .updateTodo(todo)
      .subscribe((todoUpd) => {
        Object.assign(this.todos.getValue().find((t) => (t == todo)), todoUpd);
      }
    );
  ;}
};
