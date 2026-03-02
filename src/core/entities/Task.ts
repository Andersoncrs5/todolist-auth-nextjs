export interface Task {
    id: number;
    title: string;
    description?: string;
    done: boolean;
    userId: string;
    createdAt: Date | string;
    updatedAt?: Date | string;
}