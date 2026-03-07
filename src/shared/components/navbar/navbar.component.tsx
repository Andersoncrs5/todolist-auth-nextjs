import {NavbarProps} from "@/shared/components/navbar/navbar.interface";

export default function Navbar(
    {
    children,
                               }: NavbarProps
)  {
    return (
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {children}
            </div>
        </nav>
    )
}