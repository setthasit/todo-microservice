import { Subject } from "./subject.schema";
import { Task } from "./task.schema";

export class SubjectDto extends Subject {
  id: string
}

export class TaskDto extends Task {
  id: string
}
