import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos : Todo[] = [
    // {"title": "Test", "text": "this is the test", "completed": true}
    // new Todo('test','this is the test', false),
    // new Todo('test 2','Lorem ipsum dolor sit amet consectetur adipisicing elite Amen mollitia nostrum? Dolore recusandae aspernatur commodi nostrum quos illumDicta fuga minus distinctio repellat tempora provident nesciunt quos delectus consectetur nobis!', true)
  ]

  constructor() {
    this.todos = this.getStorage();
  }

  public getStorage() {
    let s = [];
        for (let i = 0; i < localStorage.length; i++) {
            s = JSON.parse(localStorage.getItem(localStorage.key(i)!) || '{}');
        }
        return s;
  }

  pushData(todo : Todo) {
    localStorage.setItem('data', JSON.stringify(this.todos));

  }

  getAllTodos() {
    // console.log(localStorage.getItem('data'))
    // // return this.todos
    return JSON.parse(localStorage.getItem('data') || '{}')
  }

  addTodo(todo: Todo) {
    // this.todos.push(todo)
    this.todos.push({"title" : todo.title, "text" : todo.text,"date" : todo.date, "completed" : false});
    this.pushData(todo);
    location.reload();
  }

  todoCompleted(index: number, todo : Todo) {
    this.todos[index].completed = todo.completed
    localStorage.setItem('data', JSON.stringify(this.todos))
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo
    localStorage.setItem('data', JSON.stringify(this.todos))
    location.reload();
  }

  deleteTodo(index: number, todo: Todo) {
    this.todos.splice(index, 1)
    localStorage.setItem('data', JSON.stringify(this.todos))
    location.reload();
  }
}
