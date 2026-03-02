'use client'

import useRegister from "@/app/auth/register/register.hook";

import {BtnSubmit} from "@/shared/components/btnSubmit/btnSubmit.component";
import CustomInput from "@/shared/components/input/input.component";
import PasswordInput from "@/shared/components/passwordInput/password-input.component";

export default function Register() {

    const {
        handleSubmitForm,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        isSubmiting,
        errors
    } = useRegister()

    return (
        <div className="grid place-items-center min-h-screen">

            <div className="w-full max-w-md p-8 rounded-2xl border ">

                <form onSubmit={handleSubmitForm} className="flex flex-col gap-6">

                    <CustomInput
                        value={name}
                        label="Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className={"rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500  transition duration-200"}
                    />

                    {errors.Name && (
                        <span className="text-red-500 text-sm">
                            {errors.Name.message as string}
                        </span>
                    )}

                    <CustomInput
                        value={email}
                        label="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={"rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500  transition duration-200"}
                    />

                    {errors.Email && (
                        <span className="text-red-500 text-sm">
                            {errors.Email.message as string}
                        </span>
                    )}

                    <PasswordInput
                        value={password}
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className={"rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500  transition duration-200"}
                    />

                    {errors.Password && (
                        <span className="text-red-500 text-sm">
                            {errors.Password.message as string}
                        </span>
                    )}

                    <BtnSubmit
                        className="mt-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300"
                        text="Create Account"
                        isSubmiting={isSubmiting}
                    />

                </form>
            </div>

        </div>
    )
}
