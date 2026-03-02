import React, { InputHTMLAttributes } from "react";

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}