export class CreateTaskDto {
    title: string;
    description: string;
    priority: number;

    constructor(title: string, description: string, priority: number) {
        this.title = title;
        this.description = description;
        this.priority = priority;
    }
}