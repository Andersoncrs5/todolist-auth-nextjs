import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, className, ...rest }, ref) => {
        const [show, setShow] = useState(false);

        return (
            <div className="flex flex-col gap-2 relative">
                {label && (
                    <label className="text-sm font-medium text-white">
                        {label}
                    </label>
                )}

                <div className="relative">
                    <input
                        ref={ref}
                        type={show ? "text" : "password"}
                        className={`w-full pr-10 ${className}`}
                        {...rest}
                    />

                    <button
                        type="button"
                        onClick={() => setShow(prev => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                        {show ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;