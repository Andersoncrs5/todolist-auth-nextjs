
import {useCallback, useEffect, useMemo, useState} from "react";
import {AuthService} from "@/core/service/auth/auth.service";
import {useRouter} from "next/navigation";
import {UserService} from "@/core/service/user/user.service";
import ErrorHandler from "@/core/interfaces/error-handler.interface";
import {User} from "@/core/entities/User";
import {toast} from "react-toastify";
import {ResponseHTTP} from "@/core/res/response-http.res";
import axios from "axios";
import {UnauthorizedError} from "@/core/exceptions/AppError";

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

export default function useProfile() {
    const authService = useMemo(() => new AuthService(), []);
    const userService = useMemo(() => new UserService(), []);
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [errorHttp, setErrorHttp] = useState<ErrorHandler | null>(null);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await userService.getUser();

                if (response.status === 200) {
                    const content = response.data as ResponseHTTP<User>

                    setUser(content.body);
                }

            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    const response = e.response;
                    const data = e.response?.data;
                    const status = response?.status;

                    if (status && status === 404) {
                        setErrorHttp({
                            message: data.message,
                            code: status,
                            path: "/main"
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
        }

        fetchUser().then(r => r)
    })

    const deleteUser = useCallback(async () => {

        try {
            const response = await userService.delete()

            if (response.status === 200) {
                authService.logout();
                toast.success("Bye Bye");
                router.push("/");
                return;
            }

        } catch (e: unknown) {
            if (UnauthorizedError.isError(e)) {
                toast.warning("You are unauthorized");
                authService.logout();
                router.push("/");
                return;
            }

            if (axios.isAxiosError(e)) {
                const response = e.response;
                const data = e.response?.data;
                const status = response?.status;

                if (status && status === 404) {
                    toast.warning("User does not exist");
                    return;
                }

                if (status && status >= 500) {
                    toast.error("Internal server error. Please try again later");
                    return;
                }
            }

        }

    }, [userService, authService, router]);

    return {
        errorHttp,
        user,
        openDelete,
        setOpenDelete,
        deleteUser
    }
}