import React, { forwardRef } from "react";

interface CustomInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, className, ...rest }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label className="text-sm font-medium text-white">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    className={className}
                    {...rest}
                />
            </div>
        );
    }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;