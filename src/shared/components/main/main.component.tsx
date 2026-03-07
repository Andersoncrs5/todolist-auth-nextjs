import { MainProps } from "@/shared/components/main/main.props";

export default function MainLayout({ children }: MainProps) {
    return (
        <main className="flex-1 pt-16 px-6 max-w-7xl mx-auto w-full">
            {children}
        </main>
    );
}