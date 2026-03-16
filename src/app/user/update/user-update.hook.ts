"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import ErrorHandler from "@/core/interfaces/error-handler.interface";
import {UserService} from "@/core/service/user/user.service";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {toast} from "react-toastify";
import {AuthService} from "@/core/service/auth/auth.service";
import useGetUser from "@/shared/hooks/user/useGetUser";
import {useForm} from "react-hook-form";
import {UpdateUserDto} from "@/core/dto/user/update-user.dto";
import {ResponseHTTP} from "@/core/res/response-http.res";
import {UnauthorizedError} from "@/core/exceptions/AppError";
import axios, {AxiosError} from "axios";

export default function useUserUpdate() {
    const { user, error, isLoadingUser } = useGetUser();

    const userService: UserService = useMemo(() => new UserService(), []);
    const authService: AuthService = useMemo(() => new AuthService(), []);

    const router: AppRouterInstance = useRouter();

    const [errorHttp, setErrorHttp] = useState<ErrorHandler | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
        resetField
    } = useForm<UpdateUserDto>()

    const onSubmit = async (data: UpdateUserDto) => {
        clearErrors();

        try {
            const response = await userService.update(data)

            if (response.status === 200) {
                toast.success("User updated");
                router.push("/user/profile");
            }

        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status;
                const response = e.response?.data as ResponseHTTP<null>;

                console.error(response);
                if (!status) return;

                if (status === 400) {
                    const error = e as AxiosError<any>;
                    const responseData = error.response?.data;

                    if (Array.isArray(responseData?.body)) {
                        responseData.body.forEach((message: string) => {
                            toast.warning(message);
                        });
                    }
                    else if (responseData?.errors) {
                        Object.entries(responseData.errors).forEach(([field, messages]) => {
                            const fieldName = field.charAt(0).toLowerCase() + field.slice(1);

                            setError(fieldName as keyof UpdateUserDto, {
                                type: "server",
                                message: (messages as string[])[0],
                            });
                        });
                    }
                }

                if (status === 404) {
                    setErrorHttp({
                        message: "User Not Found",
                        code: 404
                    })
                }

                if (status === 409) {
                    toast.warning(response.message)
                }

                if (status && status >= 500) {
                    console.error(error)
                    toast.error("Internal server error. Try again later.");
                }
            }

        } finally {
            clearField()
        }
    }

    function clearField() {
        resetField('name')
        resetField('password')
    }

    return {
        errorHttpResponse: errorHttp || error,
        user,
        isSubmitting,
        errors,
        register,
        handleSubmit,
        onSubmit,
        isLoadingUser
    }
}