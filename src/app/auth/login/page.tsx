'use client'
import useLogin from "@/app/auth/login/login.hook";
import CustomInput from "@/shared/components/input/input.component";
import PasswordInput from "@/shared/components/passwordInput/password-input.component";
import {BtnSubmit} from "@/shared/components/btnSubmit/btn-submit.component";

export default function Login() {

    const {
        handleSubmit,
        onSubmit,
        register,
        isSubmitting,
        errors
    } = useLogin();

    return (
        <div className="grid place-items-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-2xl border">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <CustomInput
                            label="Email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                minLength: 8,
                                maxLength: 150
                            })}
                            className="rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div>
                        <PasswordInput
                            label="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: 8,
                                maxLength: 50,
                            })}
                            className="rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <BtnSubmit
                        className="mt-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
                        text="Login"
                        isSubmiting={isSubmitting}
                    />
                </form>
            </div>
        </div>
    )
}