import { Component } from "@angular/core";
import { TodoListCmp } from "../../component/todo-list/todo-list.cmp";
import { TaskInputFormCmp } from "../../component/task-input-form/task-input-form.cmp";

@Component({
  selector: "home-page",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.css"],
  standalone: true,
  imports: [TodoListCmp, TaskInputFormCmp],
})
export class HomePage {}
