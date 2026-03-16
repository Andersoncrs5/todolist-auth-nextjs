"use client"

import useUserUpdate from "@/app/user/update/user-update.hook";
import LoadFormComponent from "@/shared/components/loadForm/load-from.component.";
import NotFoundComponent from "@/shared/components/notFound/not-found.component";
import InternalErrorComponent from "@/shared/components/internalError/internal-error.component";
import ErrorState from "@/shared/components/errorState/error-state.component";
import CustomInput from "@/shared/components/input/input.component";
import PasswordInput from "@/shared/components/passwordInput/password-input.component";
import {BtnSubmit} from "@/shared/components/btnSubmit/btn-submit.component";

export default function UseUserUpdate() {

    const {
        errorHttpResponse,
        handleSubmit,
        onSubmit,
        register,
        errors,
        user,
        isSubmitting
    } = useUserUpdate()

    if (errorHttpResponse) {
        return <ErrorState error={errorHttpResponse} />;
    }

    return (
        <div className="grid place-items-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-2xl border">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <CustomInput
                            label="Name"
                            {...register("name", {
                                required: "Name is required",
                                minLength: 2,
                                maxLength: 100,
                                value: user?.userName || ""
                            })}
                            className="rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                {errors.name.message}
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
                        text="Update Account"
                        isSubmiting={isSubmitting}
                    />

                </form>
            </div>
        </div>
    )
}