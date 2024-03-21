export type TaskPriorityType = 'low' | 'normal' | 'high';

export interface ITaskModel {
  key: string;
  name: string;
  description: string;
  dueDate: string;
  priority: TaskPriorityType;
}

export class TaskDisplayModel implements ITaskModel {
  key: string;
  name: string;
  description: string;
  dueDate: string;
  priority: TaskPriorityType;
  isChecked: boolean;
  isShow: boolean;

  constructor(
    key: string,
    name: string,
    description: string,
    dueDate: string,
    priority: TaskPriorityType,
    isChecked: boolean,
    isShow: boolean
  ) {
    this.key = key;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isChecked = isChecked;
    this.isShow = isShow;
  }
}
