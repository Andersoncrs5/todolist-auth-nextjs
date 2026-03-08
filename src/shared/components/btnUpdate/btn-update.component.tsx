import {ArrowUpToLine} from "lucide-react";
import {BtnUpdateProps} from "@/shared/components/btnUpdate/btn-update.props";

export function BtnUpdate({
                              className,
                              ...rest
                          }: BtnUpdateProps) {

    return (
        <button
            type="button"
            aria-label="Delete task"
            className={`
                flex items-center justify-center
                p-2 rounded-md
                text-gray-500
                hover:text-yellow-500
                hover:bg-white
                transition-colors duration-200
                ${className}
            `}
            {...rest}
        >
            <ArrowUpToLine
                size={18}
                className="transition-colors duration-200"
            />
        </button>
    );
}