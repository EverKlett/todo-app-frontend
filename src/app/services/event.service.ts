import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {

  event: Subject<any> = new Subject();

  constructor() { }

  emitEvent(event: any) {
    this.event.next(event);
  }
}
