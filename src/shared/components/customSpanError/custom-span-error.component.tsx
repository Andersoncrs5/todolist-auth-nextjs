import {CustomSpanErrorProps} from "@/shared/components/customSpanError/custom-span-error.props";

export default function CustomSpanError({ message, className="" }: CustomSpanErrorProps) {
    return (
        <span className={"text-red-500 text-sm " + className}>
            {message}
        </span>
    )
}