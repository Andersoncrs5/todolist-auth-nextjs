'use client'

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AuthService } from "@/core/service/auth/auth.service";
import { CreateUserDto } from "@/core/dto/user/create-user.dto";

interface ValidationErrorResponse {
    errors: Record<string, string[]>;
}

export default function useRegister() {
    const authService = useMemo(() => new AuthService(), []);

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
            console.log(data)
            const result = await authService.register(data);

            if (result.status === 201) {
                toast.success("Welcome");
            }

        } catch (e: unknown) {
            const error = e as AxiosError<any>;
            const status = error.response?.status;

            console.log(error.response?.data);

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