import { ShowTaskProps } from "@/shared/components/showTask/show-task.props";

export default function ShowTask({ task, buttons }: ShowTaskProps) {

    if (!task) return null;

    return (
        <div className="w-full border rounded-lg p-4 my-3 shadow-sm">

            <h2 className="font-bold text-2xl mb-2">
                {task.title}
            </h2>

            <p className="text-sm mb-3">
                {task.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                <span>
                    status: {task.done ? "Done" : "Pending"}
                </span>

                <span>
                    priority: {task.priority}
                </span>

                <span>
                    created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
            </div>

            {buttons && (
                <div className="flex gap-2 pt-2 border-t">
                    {buttons}
                </div>
            )}

        </div>
    );
}