import { EditTodoDialogComponent } from './../edit-todo-dialog/edit-todo-dialog.component';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];
  showValidationErrors !: boolean ;
  today!: string;


  constructor(private dataService : DataService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
    this.today = new Date().toISOString().split('T')[0];
  }

  onFormSubmit(form : NgForm) {
    console.log(form);

    this.dataService.addTodo(new Todo(form.value.title, form.value.text, form.value.date));
    
    form.reset();
    this.todos = this.dataService.getAllTodos();
  }

  toggleCompleted(todo: Todo) {
    const index = this.todos.indexOf(todo)
    todo.completed = !todo.completed;
    this.dataService.todoCompleted(index, todo);
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(index, result)
      }
    })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.deleteTodo(index, todo)
      }
    })
  }

}
