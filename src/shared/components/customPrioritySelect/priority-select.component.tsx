import {TaskPriority} from "@/core/enums/task-priority .enum";
import {TaskPriorityLabels} from "@/core/const/task-priority-labels.const.";

export default function PrioritySelect({ className = "", ...rest }: PrioritySelectProps) {

    return (
        <select
            className={`w-full rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white ${className}`}
            {...rest}
        >
            {Object.values(TaskPriority)
                .filter(v => typeof v === "number")
                .map(priority => (
                    <option key={priority} value={priority}>
                        {TaskPriorityLabels[priority as TaskPriority]}
                    </option>
                ))}
        </select>
    );
}