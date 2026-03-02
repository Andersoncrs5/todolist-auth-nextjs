import React from "react";

export interface BtnSubmitProps {
    className?: string
    children?: React.ReactNode
    text?: string
    icon?: React.ReactNode
    isDisabled?: boolean
    isSubmiting?: boolean
}