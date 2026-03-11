'use client'

import { useSyncExternalStore, useMemo, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/core/service/auth/auth.service";
import { TaskService } from "@/core/service/task/task.service";
import { Page } from "@/core/res/page.res";
import { Task } from "@/core/entities/Task";
import { TaskQueryParams } from "@/core/dto/task/task-query.params";
import { UnauthorizedError } from "@/core/exceptions/AppError";
import axios, { AxiosError } from "axios";
import { ResponseHTTP } from "@/core/res/response-http.res";
import ErrorHandler from "@/core/interfaces/error-handler.interface";
import {toast} from "react-toastify";

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

export default function useMain() {

    const authService = useMemo(() => new AuthService(), []);
    const taskService = useMemo(() => new TaskService(), []);
    const router = useRouter();

    const [tasks, setTasks] = useState<Page<Task>>();
    const [open, setOpen] = useState(false)

    const [errorHttp, setErrorHttp] = useState<ErrorHandler | null>(null);

    const [queries, setQueries] = useState<TaskQueryParams>({
        createAtBefore: undefined,
        pageNumber: undefined,
        done: undefined,
        createAtAfter: undefined,
        pageSize: undefined,
        title: undefined,
        priority: undefined,
    });

    const isLogged = useSyncExternalStore(
        subscribe,
        () => authService.isLogged(),
        () => false
    );

    const changeStatus = useCallback(async (id: number) => {
        try {
            const response = await taskService.changeStatus(id);

            if (response.status === 200) {
                setTasks(prev => {
                    if (!prev) return prev;

                    return {
                        ...prev,
                        items: prev.items.map(item =>
                            item.id === id
                                ? { ...item, done: !item.done }
                                : item
                        )
                    };
                })
                toast.success("Status changed");
            }

        } catch (e: unknown) {
            if (UnauthorizedError.isError(e)) {
                toast.warning("You are unauthorized");
                authService.logout();
                router.push("/");
                return;
            }

            if (axios.isAxiosError(e)) {
                const status = e.response?.status;
                const response = e.response?.data as ResponseHTTP<unknown>

                if (status === 400) {
                    toast.warning(response.message)
                    return;
                }

                if (status === 404) {
                    toast.warning(response.message)
                    return;
                }

                if (status && status >= 500) {
                    toast.error("An internal server error occurred.")
                    return;
                }

            }

        }
    }, [authService, router, taskService])

    const getAllTasks = useCallback(async () => {

        try {

            const response = await taskService.getAll(queries);

            if (response.status === 200) {
                const body = response.data as ResponseHTTP<Page<Task>>;
                setTasks(body.body);
            }

        } catch (e: unknown) {

            if (e instanceof UnauthorizedError) {
                toast.warning("You are unauthorized");
                authService.logout();
                router.push("/");
                return;
            }

            if (e instanceof AxiosError) {

                const status = e.response?.status;

                console.error(e.response?.data);

                if (status === 404) {
                    const content = e.response?.data as ResponseHTTP<void>;
                    toast.error(content.message);

                    setErrorHttp({
                        message: content.message,
                        code: status,
                    });

                    return;
                }

                if (status && status >= 500) {
                    setErrorHttp({
                        message: "Internal server error",
                        code: status
                    });

                    return;
                }

            }

        }

    }, [queries, taskService, authService, router]);

    async function deleteById(id: number) {
        if (id <= 0) {
            toast.error("Id is missing");
            return;
        }

        try {
            const res = await taskService.delete(id)

            if (res.status === 200) {
                toast.success("Task deleted!");
                setTasks(prev => {
                    if (!prev) return prev;

                    return {
                        ...prev,
                        items: prev.items.filter(x => x.id !== id)
                    };
                });
            }

        } catch (e: unknown) {
            if (e instanceof UnauthorizedError) {
                toast.warning("You are unauthorized");
                authService.logout();
                router.push("/");
                return;
            }

            const error = e as AxiosError;
            const status = error.response?.status;

            if (status && status === 400) {
                const data = error.response?.data as ResponseHTTP<void>;
                toast.warning(data.message);
            }

            if (status && status === 404) {
                const content = error.response?.data as ResponseHTTP<void>;
                toast.error(content.message);
            }

            if (status && status >= 500) {
                toast.error("Internal server error. Try again later.");
            }
        }
    }

    function updateTask(id: number) {
        router.push(`/task/${id}/update`);
    }

    function logout() {
        authService.logout();
        toast.success("Bye Bye")
        router.push("/")
    }

    function toggleOpen() {
        setOpen(!open);
    }

    useEffect(() => {

        if (!isLogged) {
            router.replace('/');
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllTasks().then(r => r);

    }, [isLogged, router, getAllTasks]);

    return {
        isLoading: !isLogged,
        tasks,
        queries,
        setQueries,
        deleteById,
        updateTask,
        errorHttp,
        logout,
        changeStatus,
        open,
        toggleOpen
    };
}