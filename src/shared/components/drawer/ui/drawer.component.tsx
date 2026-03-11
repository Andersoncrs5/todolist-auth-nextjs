import {DrawerProps} from "@/shared/components/drawer/ui/drawer.props";

export default function Drawer({ open, className, icon, children }: DrawerProps) {

    return (
        <div>
            <div
                className={`
                fixed top-0 right-0 h-full w-100 
                 shadow-lg transform 
                transition-transform duration-300 
                ${open ? "translate-x-0" : "translate-x-full"} z-100000
                 border-l-2
                `}
            >
                {children}
            </div>
        </div>
    )
}