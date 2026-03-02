'use client'

import React, { useState } from "react";
import { PasswordInputProps } from "@/shared/components/passwordInput/password-input.interface";
import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput: React.FC<PasswordInputProps> = ({
     label,
     id,
     name,
     className,
     ...rest
 }) => {
    const inputId = id || name || label;
    const [show, setShow] = useState(false);

    return (
        <div className="flex flex-col gap-2 relative">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-white"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    id={inputId}
                    className={`w-full pr-10 ${className}`}
                    {...rest}
                />

                <BtnFunc
                    onClick={() => setShow(prev => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                >
                    {show ? <Eye size={18} /> : <EyeOff size={18} />}
                </BtnFunc>
            </div>
        </div>
    );
};

export default PasswordInput;