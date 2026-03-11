import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import {BtnDrawerProps} from "@/shared/components/drawer/btn/btn-drawer.props";
import {ArrowLeftFromLine, ArrowRightToLine} from "lucide-react";

export default function BtnDrawer({ open, onFunc }: BtnDrawerProps) {

    const className: string = open ? "drawer--drawer--open" : "drawer--drawer";
    const style: string = "";

    return (
        <>
            {open ? (
                <BtnFunc
                    icon={<ArrowRightToLine />}
                    className={className + style}
                    onClick={() => { onFunc() }}
                />
            ) : (
                <BtnFunc
                    icon={<ArrowLeftFromLine />}
                    className={className + style}
                    onClick={() => { onFunc() }}
                />
            )}
        </>
    )
}