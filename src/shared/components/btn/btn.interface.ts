import React from "react";

export interface ButtonBaseProps {
    className?: string
    children: React.ReactNode
    text?: string
    icon?: React.ReactNode
    type?: "submit" | "reset" | "button" | undefined
}
