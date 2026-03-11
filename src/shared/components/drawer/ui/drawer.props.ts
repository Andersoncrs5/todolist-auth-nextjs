import React from "react";

export interface DrawerProps {
    open: boolean;
    className?: string;
    icon?: string;
    children?: React.ReactNode;
}