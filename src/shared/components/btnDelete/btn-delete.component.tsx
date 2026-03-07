import { Trash } from "lucide-react";
import { BtnDeleteProps } from "@/shared/components/btnDelete/btn-delete.props";

export function BtnDelete({
                              className,
                              ...rest
                          }: BtnDeleteProps) {

    return (
        <button
            type="button"
            aria-label="Delete task"
            className={`
                flex items-center justify-center
                p-2 rounded-md
                text-gray-500
                hover:text-red-600
                hover:bg-red-100
                transition-colors duration-200
                ${className}
            `}
            {...rest}
        >
            <Trash
                size={18}
                className="transition-colors duration-200"
            />
        </button>
    );
}