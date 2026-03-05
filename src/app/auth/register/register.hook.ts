'use client'

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AuthService } from "@/core/service/auth/auth.service";
import { CreateUserDto } from "@/core/dto/user/create-user.dto";
import {TokenResponse} from "@/core/res/token-response.res";
import { useRouter } from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ResponseHTTP} from "@/core/res/response-http.res";

export default function useRegister() {
    const authService: AuthService = useMemo(() => new AuthService(), []);
    const router: AppRouterInstance = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm<CreateUserDto>();

    const [isSubmiting, setIsSubmiting] = useState(false);

    const onSubmit = async (data: CreateUserDto) => {
        setIsSubmiting(true);
        clearErrors();

        try {
            const result = await authService.register(data);

            if (result.status === 201) {

                const tokens = result.data.body as TokenResponse

                authService.setTokens(tokens)
                toast.success("Welcome");

                router.push('/main')
            }

        } catch (e: unknown) {
            const error = e as AxiosError<any>;
            const status = error.response?.status;

            console.error(error.response?.data);

            if (status === 400) {
                const responseData = error.response?.data;

                if (Array.isArray(responseData?.body)) {
                    responseData.body.forEach((message: string) => {
                        setError("password", {
                            type: "server",
                            message: message,
                        });
                    });
                }
                else if (responseData?.errors) {
                    Object.entries(responseData.errors).forEach(([field, messages]) => {
                        const fieldName = field.charAt(0).toLowerCase() + field.slice(1);

                        setError(fieldName as keyof CreateUserDto, {
                            type: "server",
                            message: (messages as string[])[0],
                        });
                    });
                }
            }

            if (status === 409) {
                const responseData = error.response?.data as ResponseHTTP<void>
                toast.warning(responseData.message)
            }
            
            if (status && status >= 500) {
                toast.error("Internal server error. Try again later.");
            }
        } finally {
            setIsSubmiting(false);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        isSubmiting,
        errors
    };
}