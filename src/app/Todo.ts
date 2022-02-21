export interface Todo {
  id?: string;
  task: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export function createDefTodo(): Todo {
  const todo: Todo = {
    "id": "",
    "task": "",
    "isDone": false,
    "createdAt": "",
    "updatedAt": "",
    "deletedAt": ""
 };
 return todo;
};
