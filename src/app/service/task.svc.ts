import { Injectable } from "@angular/core";
import { ITaskModel } from "../model/task.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskSvc {
  public bsTaskLstChange = new BehaviorSubject(false);

  /**
   * Get task list from local storage.
   *
   * @return task list
   */
  getTaskList(): ITaskModel[] {
    let taskLst = localStorage.getItem("taskLst");
    if (taskLst) {
      let doTaskLst = JSON.parse(taskLst);
      this.sortTaskListByDueDate(doTaskLst);
      return doTaskLst;
    } else {
      return [];
    }
  }

  /**
   * Add new task to task list.
   *
   */
  addNewTask(task: ITaskModel) {
    let doTaskLst = [];
    let taskLst = localStorage.getItem("taskLst");
    if (taskLst) {
      doTaskLst = JSON.parse(taskLst);
      doTaskLst.push(task);
    } else {
      doTaskLst = [];
      doTaskLst.push(task);
    }

    this.sortTaskListByDueDate(doTaskLst);
    localStorage.setItem("taskLst", JSON.stringify(doTaskLst));
  }

  /**
   * Update a task.
   *
   * @param task: Task to update
   * @param key: Task key in local storage
   */
  updateTask(task: ITaskModel, key: string) {
    let taskLst = localStorage.getItem("taskLst");
    if (taskLst) {
      let doTaskLst = JSON.parse(taskLst);
      let updateIndex = this.findIndexByTaskKey(doTaskLst, key);
      doTaskLst[updateIndex] = task;
      this.sortTaskListByDueDate(doTaskLst);
      localStorage.setItem("taskLst", JSON.stringify(doTaskLst));
    }
  }

  /**
   * Remove a task.
   *
   * @param key: Task key in local storage
   */
  removeTask(key: string) {
    let taskLst = localStorage.getItem("taskLst");
    if (taskLst) {
      let doTaskLst = JSON.parse(taskLst);
      let removeIndex = this.findIndexByTaskKey(doTaskLst, key);
      doTaskLst.splice(removeIndex, 1);
      this.sortTaskListByDueDate(doTaskLst);
      localStorage.setItem("taskLst", JSON.stringify(doTaskLst));
    }
  }

  /**
   * Find index of task in task list.
   *
   * @param taskLst: Task list
   * @param key: Task key to find index
   */
  findIndexByTaskKey(taskLst: ITaskModel[], key: string): number {
    for (let task of taskLst) {
      if (task.key == key) {
        return taskLst.indexOf(task);
      }
    }
    return -1;
  }

  /**
   * Sort task list by due date
   *
   * @param taskLst: Task list to sort
   */
  sortTaskListByDueDate(taskLst: ITaskModel[]) {
    taskLst.sort((task1, task2) => {
      let dueDate1 = new Date(task1.dueDate);
      let dueDate2 = new Date(task2.dueDate);
      if (dueDate1 < dueDate2) {
        return -1;
      }
      if (dueDate1 > dueDate2) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Notify the change to components
   *
   */
  notifyTaskListChange() {
    this.bsTaskLstChange.next(true);
  }

  /**
   * Reset notify change
   *
   */
  resetNotifyTaskListChange() {
    this.bsTaskLstChange.next(false);
  }
}
