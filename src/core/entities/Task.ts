export interface Task {
    id: number;
    title: string;
    description?: string;
    done: boolean;
    priority: number;
    userId: string;
    createdAt: Date | string;
    updatedAt?: Date | string;
}