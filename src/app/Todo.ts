export interface Todo {
  id?: string;
  task: string;
  isDone: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export function createDefTodo(): Todo {
  const todo: Todo = {
    "id": "",
    "task": "",
    "isDone": 0,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": ""
 };
 return todo;
};
