import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos : Todo[] = [
    new Todo('this is the test', false),
    new Todo('Lorem ipsum dolor sit amet consectetur adipisicing elite Amen mollitia nostrum? Dolore recusandae aspernatur commodi nostrum quos illumDicta fuga minus distinctio repellat tempora provident nesciunt quos delectus consectetur nobis!', true)
  ]

  constructor() { }

  getAllTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo;
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
