import {ButtonBaseProps} from "@/shared/components/btn/btn.interface";


export const ButtonBase = ({ icon, text ,children, className, ...props }: ButtonBaseProps):  React.JSX.Element => {
    return (
        <button
            className={`p-2 rounded ${className}`}
            {...props}
        >
            {children}

            {text}

            {icon}
        </button>
    );
};