'use client'

import {useMemo, useState} from "react";
import { toast } from "sonner";
import {AuthService} from "@/core/service/auth/auth.service";
import {CreateUserDto} from "@/core/dto/user/create-user.dto";
import {AxiosError} from "axios";
import {InvalidInput} from "@/core/res/invalid-input.res";
import {ResponseHTTP} from "@/core/res/response-http.res";
import {ValidationErrorResponse} from "@/core/res/validation-error-response.res";
import { useForm } from "react-hook-form";

export default function useRegister() {
    const authService = useMemo(() => new AuthService(), []);
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmiting(true);

        try {
            const dto: CreateUserDto = {
                name: name,
                email: email,
                password: password
            }

            const result = await authService.register(dto);
            console.log(result);

            if (result.status === 201) {
                toast.message("Welcome");
                
            }

        } catch (e: unknown) {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const status = e.response?.status;

            if (status === 400) {
                const error = e as AxiosError<ValidationErrorResponse>;

                const apiErrors = error.response?.data?.errors as Record<string, string[]>;

                if (apiErrors) {
                    Object.entries(apiErrors).forEach(([field, messages]) => {
                        setError(field, {
                            type: "server",
                            message: messages[0],
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
    }

    return {
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        handleSubmitForm,
        isSubmiting,
        errors
    }

}