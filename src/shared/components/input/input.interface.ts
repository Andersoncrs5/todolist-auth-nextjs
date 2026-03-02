import React, { InputHTMLAttributes } from "react";

type InputFormType =
    | "text"
    | "email"
    | "password"
    | "hidden"
    | "time"
    | "url"
    | "date";

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: InputFormType;
    label?: string;
}