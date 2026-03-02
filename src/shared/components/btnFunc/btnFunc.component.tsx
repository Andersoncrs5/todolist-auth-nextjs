import React from "react";
import { ButtonBase } from "@/shared/components/btn/btn.component";
import {BtnFuncProps} from "@/shared/components/btnFunc/btnFunc.interface";

const BtnFunc: React.FC<BtnFuncProps> = ({
     label,
     className,
     icon,
        children,
     ...rest
 }) => {
    return (
        <ButtonBase
            type="button"
            className={className}
            {...rest}
        >
            {label}
            {icon}
            {children}
        </ButtonBase>
    );
};

export default BtnFunc;