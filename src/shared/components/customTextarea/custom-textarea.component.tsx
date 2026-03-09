import { CustomTextareaProps } from "@/shared/components/customTextarea/custom-textarea.props";

export default function CustomTextarea({ className = "", text, label, ...rest  }: CustomTextareaProps) {
    return (
        <>
            <label
                htmlFor={label}
                className="text-sm font-medium text-white"
            >{label}</label>
            <textarea
                className={className}
                {...rest}
            >
                {text}
            </textarea>
        </>

    );
}