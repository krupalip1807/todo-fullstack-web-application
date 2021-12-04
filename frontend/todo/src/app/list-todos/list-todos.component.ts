import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos: Todo[];

  message: string
  //  = [
  //   new Todo(1, 'Learn Angular', false, new Date()),
  //   new Todo(2, 'Learn to concentrate', false, new Date()),
  //   new Todo(3, 'Visit India', false, new Date()),
  //   new Todo(4, 'Make my loved one\'s proud', false, new Date()),
  //   new Todo(5, 'Stay Happy and Healthy', true, new Date()),
  //   new Todo(6, 'LIVE!', true, new Date())
  // ]

  constructor(
    private todoService:TodoDataService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos()
   }

    refreshTodos(){
      this.todoService.retrieveAllTodos('kparmar').subscribe(
        response => {
          console.log(response)
          this.todos = response;
        }
    )
    }

  deleteTodo(id){
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo('kparmar', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} successful`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id){
    console.log(`update ${id}`)
    this.router.navigate(['todos', id])
  }

  addTodo(){
    this.router.navigate(['todos', -1])
  }
}
