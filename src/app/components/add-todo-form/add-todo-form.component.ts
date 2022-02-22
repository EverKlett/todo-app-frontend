import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit {

  @Output()
  onTodoAdded = new EventEmitter<Todo>();

  isActive: Boolean = false;

  constructor(private todoService: TodoService, private eventService: EventService) { }

  ngOnInit(): void {
  }

  // Functionalities
  onAddTodo(todo: Todo) {
    this.todoService.createTodo(todo).subscribe((t) => {
      this.onTodoAdded.emit(t);
      this.eventService.emitEvent({ name: "addedTodo" });
    });
    this.isActive = !this.isActive;
  }

  onToggleButton() {
    this.isActive = !this.isActive;
  }
}
