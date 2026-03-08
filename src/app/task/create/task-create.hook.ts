'use client'

import {useMemo} from "react";
import {TaskService} from "@/core/service/task/task.service";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {CreateTaskDto} from "@/core/dto/task/create-task.dto";
import {UnauthorizedError} from "@/core/exceptions/AppError";
import {toast} from "sonner";
import {AuthService} from "@/core/service/auth/auth.service";
import {AxiosError} from "axios";
import {ResponseHTTP} from "@/core/res/response-http.res";

export default function useTaskCreate() {
    const taskService: TaskService = useMemo(() => new TaskService(), []);
    const authService = useMemo(() => new AuthService(), []);
    const router: AppRouterInstance = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        resetField,
        formState: { errors, isSubmitting }
    } = useForm<CreateTaskDto>();

    const onSubmit = async (data: CreateTaskDto) => {
        clearErrors();

        try {

            const res = await taskService.create(data);

            if (res.status === 201) {
                toast.success("Task created");
                clearFields()
                router.push("/main");
            }

        } catch (e: unknown) {
            if (e instanceof UnauthorizedError) {
                toast.warning("You are unauthorized");
                authService.logout();
                router.push("/");
                return;
            }

            const error = e as AxiosError<any>;
            const status = error.response?.status;

            console.error(error.response?.data);

            if (status && status === 400) {
                const responseData = error.response?.data;

                if (Array.isArray(responseData)) {
                    responseData.forEach((item: string) => {
                        toast.warning(item);
                    });
                } else if (responseData?.errors) {
                    Object.entries(errors).forEach(([field, messages]) => {

                        let fieldName = field;

                        if (field.startsWith("$."))
                            fieldName = field.replace("$.","");

                        if (fieldName === "taskDto")
                            return;

                        setError(fieldName as keyof CreateTaskDto, {
                            type: "server",
                            message: (messages as unknown as string[])[0]
                        });
                    });
                }
            }

            if (status && status === 404) {
                const responseData = error.response?.data as ResponseHTTP<void>

                toast.warning(responseData.message);
            }

            if (status && status >= 500) {
                toast.error("Internal server error. Try again later.");
            }
        }


    }

    function clearFields() {
        resetField("title")
        resetField("description")
        resetField("priority")
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        isSubmitting,
        errors
    };
}