import { Component, EventEmitter, Input, Output, signal } from "@angular/core";
import { TaskInputFormCmp } from "../task-input-form/task-input-form.cmp";
import { TaskSvc } from "../../service/task.svc";
import { TaskDisplayModel } from "../../model/task.model";
import { CHECKED_ICON, UNCHECKED_ICON } from "../../constant/icon.const";

@Component({
  selector: "task-cmp",
  templateUrl: "./task.cmp.html",
  styleUrls: ["./task.cmp.css"],
  standalone: true,
  imports: [TaskInputFormCmp],
})
export class TaskCmp {
  @Input("task") task: TaskDisplayModel = {
    key: "",
    name: "",
    description: "",
    dueDate: "",
    priority: "normal",
    isChecked: false,
    isShow: true,
  };
  @Output("notifyChecked") notifyChecked = new EventEmitter<{
    key: string;
    isChecked: boolean;
  }>();
  isShowEditForm = signal(false);

  constructor(private taskSvc: TaskSvc) {}

  /**
   * @returns checked icon url if task is checked, else return unchecked icon url
   */
  getCheckIconUrl(): string {
    if (this.task.isChecked) {
      return CHECKED_ICON;
    }
    return UNCHECKED_ICON;
  }

  /**
   * Set task to checked/unchecked.
   */
  onCheckTask() {
    this.task.isChecked = !this.task.isChecked;
    this.notifyChecked.emit({
      key: this.task.key,
      isChecked: this.task.isChecked,
    });
  }

  /**
   * Show/Hide edit form.
   */
  onClickDetailBtn() {
    if (this.isShowEditForm()) {
      this.isShowEditForm.set(false);
    } else {
      this.isShowEditForm.set(true);
    }
  }

  /**
   * Remove this task from local storage.
   * Notify the change.
   */
  onClickRemoveBtn() {
    this.taskSvc.removeTask(this.task.key);
    this.taskSvc.notifyTaskListChange();
  }
}
