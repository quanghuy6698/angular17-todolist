import { Component, signal } from "@angular/core";
import { TaskCmp } from "../task/task.cmp";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ITaskModel, TaskDisplayModel } from "../../model/task.model";
import { TaskSvc } from "../../service/task.svc";

@Component({
  selector: "todo-list-cmp",
  templateUrl: "./todo-list.cmp.html",
  styleUrls: ["./todo-list.cmp.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TaskCmp],
})
export class TodoListCmp {
  public taskLst: Map<string, TaskDisplayModel> = new Map();
  public taskLstOnTemplate = signal(new Array());
  public isShowBulkAction = signal(false);
  public txtSearch = signal("");

  constructor(private taskSvc: TaskSvc) {
    this.getTaskList();
    this.subscribeTaskListChange();
  }

  /**
   * Get task list from local storage.
   * Keep checked/show state of task which is not removed.
   */
  getTaskList() {
    let newTaskLstDisplay: Map<string, TaskDisplayModel> = new Map();
    let doTaskLst = this.taskSvc.getTaskList();

    doTaskLst.forEach((task) => {
      newTaskLstDisplay.set(task.key, this.convertTaskToDisplayObj(task));
    });

    this.taskLst.forEach((task) => {
      let newTaskDisplay = newTaskLstDisplay.get(task.key);
      if (newTaskDisplay) {
        newTaskDisplay!.isChecked = task.isChecked;
        newTaskDisplay!.isShow = task.isShow;
      }
    });

    this.taskLst = newTaskLstDisplay;
    this.taskLstOnTemplate.set(Array.from(this.taskLst, ([key, value]) => ({ key, value })));
  }

  /**
   * Subscribe to change of task list in local storage
   *
   */
  subscribeTaskListChange() {
    this.taskSvc.bsTaskLstChange.subscribe((isChanged) => {
      if (isChanged) {
        this.getTaskList();
        this.taskSvc.resetNotifyTaskListChange();
        this.checkShowBulkAction();
      }
    });
  }

  /**
   * On select a task
   *
   * @param notifyObj: Includes task key and task checked status
   */
  onSelectTask(notifyObj: any) {
    this.taskLst.get(notifyObj.key)!.isChecked = notifyObj.isChecked;
    this.checkShowBulkAction();
  }

  /**
   * Check if one or more tasks in the task list is selected, then show the bulk action
   *
   */
  checkShowBulkAction() {
    for (let [key, value] of this.taskLst) {
      if (value.isChecked) {
        this.isShowBulkAction.set(true);
        return;
      }
    }
    this.isShowBulkAction.set(false);
  }

  /**
   * Remove a task from task list.
   * Reload task list.
   *
   */
  onClickRemoveBtn() {
    let removeKeyArr: string[] = [];
    this.taskLst.forEach((task) => {
      if (task.isChecked) {
        removeKeyArr.push(task.key);
      }
    });

    for (let key of removeKeyArr) {
      this.taskSvc.removeTask(key);
    }

    this.getTaskList();
    this.checkShowBulkAction();
  }

  /**
   * Every time the user types, search all the tasks in the list with the matching title
   *
   */
  onSearchTask() {
    if (this.txtSearch) {
      this.taskLst.forEach((task) => {
        if (task.name.includes(this.txtSearch())) {
          task.isShow = true;
        } else {
          task.isShow = false;
        }
      });
    } else {
      this.taskLst.forEach((task) => {
        task.isShow = true;
      });
    }
  }

  /**
   * Convert task object to display object
   *
   * @return task display object
   */
  convertTaskToDisplayObj(task: ITaskModel): TaskDisplayModel {
    return new TaskDisplayModel(task.key, task.name, task.description, task.dueDate, task.priority, false, true);
  }
}
