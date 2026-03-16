import NotFoundComponent from "@/shared/components/notFound/not-found.component";
import InternalErrorComponent from "@/shared/components/internalError/internal-error.component";
import ErrorHandler from "@/core/interfaces/error-handler.interface";

interface ErrorStateProps {
    error?: ErrorHandler | null;
}

export default function ErrorState({ error }: ErrorStateProps) {
    if (!error?.code) return null;

    if (error.code === 404) {
        return <NotFoundComponent message={error.message} path={error.path} />;
    }

    if (error.code >= 500) {
        return <InternalErrorComponent message={error.message} path={error.path} />;
    }

    return null;
}