import {TaskPriority} from "@/core/enums/task-priority .enum";

export class CreateTaskDto {
    title: string;
    description: string;
    priority: TaskPriority;

    constructor(title: string, description: string, priority: TaskPriority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
    }
}