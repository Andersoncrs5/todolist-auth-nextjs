import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {AuthService} from "@/core/service/auth/auth.service";
import {useMemo} from "react";
import {useForm} from "react-hook-form";
import {LoginUserDto} from "@/core/dto/user/login-user.dto";
import {AxiosError} from "axios";
import {ResponseHTTP} from "@/core/res/response-http.res";
import {TokenResponse} from "@/core/res/token-response.res";
import {UnauthorizedError} from "@/core/exceptions/AppError";
import { toast } from "react-toastify";

export default function useLogin() {
    const authService: AuthService = useMemo(() => new AuthService(), []);
    const router: AppRouterInstance = useRouter();

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors, isSubmitting }
     } = useForm<LoginUserDto>()

    const onSubmit = async (data: LoginUserDto) => {
        clearErrors()

        try {

            const result = await authService.login(data);

            console.log(result);

            if (result.status === 200) {
                const tokens = result.data.body as TokenResponse

                authService.setTokens(tokens)
                toast.success("Welcome again");

                router.push('/main')
            }

        } catch (e: unknown) {
            if (e instanceof UnauthorizedError) {
                toast.warning("Login failed.");
            }

            const error = e as AxiosError<any>;
            const status = error.response?.status;

            console.log(error.response?.data);

            if (status && status === 400) {
                const content = error.response?.data as ResponseHTTP<void>

                toast.warning(content.message);
            }

            if (status && status >= 500) {
                toast.error("Internal server error. Try again later.");
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