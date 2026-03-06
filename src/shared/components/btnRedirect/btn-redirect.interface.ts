import {ButtonHTMLAttributes} from "react";

export interface BtnRedirectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    to: string;
    children?: React.ReactNode;
    text?: string;
    icon?: React.ReactNode
}