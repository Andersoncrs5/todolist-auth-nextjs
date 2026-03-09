import { NotFoundProps } from "@/shared/components/notFound/not-found.props";
import { useRouter } from "next/navigation";
import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import { MoveLeft } from "lucide-react";

export default function NotFoundComponent({ message, className, path }: NotFoundProps) {
    const router = useRouter();

    function handleBack() {
        if (path) {
            router.push(path);
        } else {
            router.back();
        }
    }

    return (
        <div className="grid place-items-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-2xl border text-center space-y-4">

                <h1 className={`text-2xl font-semibold ${className ?? ""}`}>
                    {message ?? "Task not found"}
                </h1>

                <BtnFunc
                    onClick={handleBack}
                    icon={<MoveLeft />}
                >
                    Go back
                </BtnFunc>

            </div>
        </div>
    );
}