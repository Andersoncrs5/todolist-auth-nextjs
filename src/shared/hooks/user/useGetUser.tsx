// hooks/useUser.ts
import {useCallback, useEffect, useMemo, useState} from "react";
import {UserService} from "@/core/service/user/user.service";
import {AuthService} from "@/core/service/auth/auth.service";
import {useRouter} from "next/navigation";
import {User} from "@/core/entities/User";
import ErrorHandler from "@/core/interfaces/error-handler.interface";
import {ResponseHTTP} from "@/core/res/response-http.res";
import {UnauthorizedError} from "@/core/exceptions/AppError";
import axios from "axios";
import {toast} from "react-toastify";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function useGetUser() {
    const userService: UserService = useMemo(() => new UserService(), []);
    const authService: AuthService = useMemo(() => new AuthService(), []);
    const router: AppRouterInstance = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<ErrorHandler | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            setIsLoadingUser(true);
            const response = await userService.getUser();
            if (response.status === 200) {
                setUser((response.data as ResponseHTTP<User>).body);
            }
        } catch (e: unknown) {
            handleUserError(e, authService, router, setError);
        } finally {
            setIsLoadingUser(false);
        }
    }, [userService, authService, router]);

    useEffect(() => { fetchUser(); }, [fetchUser]);

    return { user, error, isLoadingUser, fetchUser, setUser };
}

function handleUserError(e: unknown, authService: AuthService, router: AppRouterInstance, setError: any) {
    if (UnauthorizedError.isError(e)) {
        toast.warning("You are unauthorized");
        authService.logout();
        router.push("/");
        return;
    }
    if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        if (status === 404) {
            setError({ message: e.response?.data.message, code: 404, path: "/main" });
        } else if (status && status >= 500) {
            setError({ message: "Internal server error", code: status });
        }
    }
}