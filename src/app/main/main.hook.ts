'use client'

import { useSyncExternalStore, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/core/service/auth/auth.service";

const subscribe = () => () => {};

export default function useMain() {
    const authService = useMemo(() => new AuthService(), []);
    const router = useRouter();

    const isLogged = useSyncExternalStore(
        subscribe,
        () => authService.isLogged(),
        () => false
    );

    useEffect(() => {
        if (!isLogged) {
            router.replace('/');
        }
    }, [isLogged, router]);

    return { isLoading: !isLogged };
}