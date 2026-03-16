import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import {BtnDrawerProps} from "@/shared/components/drawer/btn/btn-drawer.props";
import {ArrowLeftFromLine, ArrowRightToLine} from "lucide-react";

export default function BtnDrawer({ open, onFunc }: BtnDrawerProps) {


    return (
        <>
            {open ? (
                <BtnFunc
                    icon={<ArrowRightToLine />}
                    className={"hover:bg-gray-600 hover:text-black focus:outline-none"}
                    onClick={() => { onFunc() }}
                />
            ) : (
                <BtnFunc
                    icon={<ArrowLeftFromLine />}
                    className={"hover:bg-gray-600 hover:text-black focus:outline-none"}
                    onClick={() => { onFunc() }}
                />
            )}
        </>
    )
}