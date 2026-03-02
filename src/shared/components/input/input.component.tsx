import React from "react";
import { CustomInputProps } from "./input.interface";

const CustomInput: React.FC<CustomInputProps> = (props) => {
    const { label, id, name, className, ...rest } = props;
    const inputId = id || name || label;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-white">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={className}
                {...rest}
            />
        </div>
    );
};

export default CustomInput;