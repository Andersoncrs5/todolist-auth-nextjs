import {TaskPriority} from "@/core/enums/task-priority .enum";

export class UpdateTaskDto {
    constructor(
        public title: string,
        public description: string,
        public priority: TaskPriority,
        public done: boolean
    ) {}
}