export interface CustomTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    text?: string;
    className?: string;
    label: string;
}