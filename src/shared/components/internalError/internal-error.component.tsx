import {InternalErrorProps} from "@/shared/components/internalError/internal-error.props";
import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import {MoveLeft} from "lucide-react";
import {useRouter} from "next/navigation";

export default function InternalErrorComponent({className, message, path}: InternalErrorProps) {
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
                    {message ?? "An internal server error occurred."}
                </h1>

                <p className="text-sm text-muted-foreground">
                    Please try again later.
                </p>

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