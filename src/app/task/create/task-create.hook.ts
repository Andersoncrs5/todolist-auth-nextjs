import {useCallback, useMemo} from "react";
import {TaskService} from "@/core/service/task/task.service";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {CreateTaskDto} from "@/core/dto/task/create-task.dto";
import {CreateUserDto} from "@/core/dto/user/create-user.dto";
import {UnauthorizedError} from "@/core/exceptions/AppError";
import {toast} from "sonner";
import {AuthService} from "@/core/service/auth/auth.service";

export default function useTaskCreate() {
    const taskService = useMemo(() => new TaskService(), []);
    const authService = useMemo(() => new AuthService(), []);
    const router: AppRouterInstance = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<CreateTaskDto>();

    const onSubmit = async (data: CreateUserDto) => {
        clearErrors();

        try {

        } catch (e: unknown) {
            if (e instanceof UnauthorizedError) {
                toast.warning("You are unauthorized");
                authService.logout();
                router.push("/");
                return;
            }
        }

    }

    return {
        register,
        handleSubmit,
        onSubmit,
        isSubmitting,
        errors
    };
}