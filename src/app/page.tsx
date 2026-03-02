'use client'

import { BtnRedirect } from "@/shared/components/btnRedirect/BtnRedirect";

export default function Home() {
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
                        className="bg-blue-900 border px-6 py-2 rounded-lg hover:bg-transparent transition duration-300"
                    />
                    <BtnRedirect
                        to="auth/login"
                        text="Login"
                        className="bg-blue-900 border px-6 py-2 rounded-lg hover:bg-transparent transition duration-300"
                    />
                </div>

            </div>

        </div>
    );
}