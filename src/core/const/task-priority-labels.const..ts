import {TaskPriority} from "@/core/enums/task-priority .enum";

export const TaskPriorityLabels: Record<TaskPriority, string> = {
    [TaskPriority.Low]: "Low",
    [TaskPriority.Medium]: "Medium",
    [TaskPriority.High]: "High",
    [TaskPriority.Urgent]: "Urgent"
};

export const PriorityColor = {
    [TaskPriority.Low]: "text-green-400",
    [TaskPriority.Medium]: "text-yellow-400",
    [TaskPriority.High]: "text-orange-400",
    [TaskPriority.Urgent]: "text-red-500"
};