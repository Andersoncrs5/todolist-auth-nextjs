"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AuthService } from "@/core/service/auth/auth.service";
import { TaskService } from "@/core/service/task/task.service";
import { Task } from "@/core/entities/Task";
import { ResponseHTTP } from "@/core/res/response-http.res";
import { UnauthorizedError } from "@/core/exceptions/AppError";
import ErrorHandler from "@/core/interfaces/error-handler.interface";
import { toast } from "react-toastify";
import axios from "axios";
import {useForm} from "react-hook-form";
import {CreateTaskDto} from "@/core/dto/task/create-task.dto";
import {UpdateTaskDto} from "@/core/dto/task/update-task.dto";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

export default function useUpdateTask() {
    const params = useParams<{ id: string }>();
    const router: AppRouterInstance = useRouter();

    const authService: AuthService = useMemo(() => new AuthService(), []);
    const taskService: TaskService = useMemo(() => new TaskService(), []);

    const [task, setTask] = useState<Task | null>(null);
    const [errorHttp, setErrorHttp] = useState<ErrorHandler | null>(null);
    const [loading, setLoading] = useState(true);

    const id = Number(params.id);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        control,
        resetField,
        formState: { errors, isSubmitting }
    } = useForm<UpdateTaskDto>();

    const isLogged = useSyncExternalStore(
        subscribe,
        () => authService.isLogged(),
        () => false
    );

    useEffect(() => {

        if (!isLogged) {
            router.replace("/");
            return;
        }

        if (!Number.isFinite(id) || id <= 0) {
            toast.warning("Invalid or missing ID");
            router.back();
            return;
        }

        const fetchTask = async () => {
            setLoading(true);

            try {
                const res = await taskService.getById(id);

                if (res.status === 200) {
                    const data = res.data as ResponseHTTP<Task>;
                    setTask(data.body);
                }

            } catch (e: unknown) {

                if (e instanceof UnauthorizedError) {
                    toast.warning("You are unauthorized");
                    authService.logout();
                    router.push("/");
                    return;
                }

                if (axios.isAxiosError(e)) {
                    const status = e.response?.status;
                    const response = e.response?.data as ResponseHTTP<null>;

                    if (!status) return;

                    if (status === 400 || status === 404) {
                        setErrorHttp({
                            message: response?.message ?? "Request error",
                            code: status,
                            path: "/main"
                        });
                        return;
                    }

                    if (status >= 500) {
                        setErrorHttp({
                            message: response?.message ?? "Internal server error",
                            code: status,
                            path: "/main"
                        });
                        return;
                    }
                }

                setErrorHttp({
                    message: "Unexpected error",
                    code: 500,
                    path: "/main"
                });

            } finally {
                setLoading(false);
            }
        };

        fetchTask();

    }, [authService, id, isLogged, router, taskService]);

    const onSubmit = async (dto: UpdateTaskDto) => {
        clearErrors()

        try {
            const res = await taskService.update(id, dto);

            if (res.status === 200) {
                toast.success("Task updated");
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

            if (axios.isAxiosError(e)) {
                const status = e.response?.status;
                const response = e.response?.data as ResponseHTTP<null>;

                if (status && status === 400) {
                    const responseData = e.response?.data;

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
                    setErrorHttp({
                        message: response?.message ?? "Task not found",
                        code: status,
                        path: "/main"
                    });
                    return;
                }

                if (status && status >= 500) {
                    setErrorHttp({
                        message: response?.message ?? "Internal server error",
                        code: status,
                        path: "/main"
                    });
                    return;
                }
            }

        }

    }

    function clearFields() {
        resetField("title")
        resetField("description")
        resetField("priority")
        resetField("done")
    }

    return {
        task,
        errorHttp,
        isLoading: loading,
        onSubmit,
        handleSubmit,
        errors,
        register,
        isSubmitting,
        control
    };
}