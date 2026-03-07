'use client'

import { BtnRedirect } from "@/shared/components/btnRedirect/btn-redirect";
import { useRouter } from "next/navigation";
import { AuthService } from "@/core/service/auth/auth.service";
import { useEffect, useMemo } from "react";

export default function Home() {
    const router = useRouter();
    const authService = useMemo(() => new AuthService(), []);

    useEffect(() => {
        const checkLogin = () => {
            const result = authService.isLogged();
            if (result) {
                router.push("/main");
            }
        };

        checkLogin();
    }, [authService, router]);

    return (
        <div className="grid place-items-center min-h-screen">
            <div className="grid grid-cols-3 gap-6 text-white">
                <div className="col-span-3 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-[0.3em] font-serif text-white drop-shadow-lg">
                        WELCOME
                    </h1>
                </div>

                <div className="col-span-3 flex justify-center gap-6">
                    <BtnRedirect
                        to="auth/register"
                        text="Register"
                        className="bg-transparent border px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    />
                    <BtnRedirect
                        to="auth/login"
                        text="Login"
                        className="bg-transparent border px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    />
                </div>
            </div>
        </div>
    );
}