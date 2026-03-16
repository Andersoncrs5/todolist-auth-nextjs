"use client";

import useUpdateTask from "@/app/task/[id]/update/task-update.hook";
import NotFoundComponent from "@/shared/components/notFound/not-found.component";
import InternalErrorComponent from "@/shared/components/internalError/internal-error.component";
import LoadFormComponent from "@/shared/components/loadForm/load-from.component.";
import CustomInput from "@/shared/components/input/input.component";
import CustomSpanError from "@/shared/components/customSpanError/custom-span-error.component";
import CustomTextarea from "@/shared/components/customTextarea/custom-textarea.component";
import PrioritySelect from "@/shared/components/customPrioritySelect/priority-select.component";
import {BtnSubmit} from "@/shared/components/btnSubmit/btn-submit.component";
import DoneRadio from "@/shared/components/customDoneRadio/done-radio.component";
import {Controller} from "react-hook-form";

export default function UpdateTaskPage() {

    const {
        task,
        errorHttp,
        onSubmit,
        handleSubmit,
        errors,
        register,
        isSubmitting,
        control
    } = useUpdateTask();

    if (errorHttp && errorHttp.code && errorHttp.code === 404) {
        return <NotFoundComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    if (errorHttp && errorHttp.code && errorHttp.code >= 500) {
        return <InternalErrorComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    return (
        <div className="grid place-items-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-2xl border">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <CustomInput
                            label="Title"
                            {...register("title", {
                                required: "Title is required",
                                minLength: 5,
                                maxLength: 100,
                                value: task?.title
                            })}
                            className="rounded-lg px-4 py-2 bg-white/10 border border-white/30 text-white"
                        />
                        {
                            errors.title && (
                                <CustomSpanError message={errors.title.message} />
                            )
                        }
                    </div>
                    <div>
                        <CustomTextarea
                            className={"w-full rounded-lg px-3 py-1 bg-white/10 border border-white/30 text-white"}
                            {...register("description", {
                                required: "Description is required",
                                minLength: 1,
                                maxLength: 500,
                                value: task?.description
                            })}
                            rows={3}
                            label={"Description"}
                        />
                        {
                            errors.description && (
                                <CustomSpanError message={errors.description.message} />
                            )
                        }
                    </div>
                    <div>
                        <PrioritySelect
                            {...register("priority", {
                                required: "Priority is required",
                                valueAsNumber: true,
                                value: task?.priority
                            })}
                        />
                        {
                            errors.priority && (
                                <CustomSpanError message={errors.priority.message} />
                            )
                        }
                    </div>
                    <Controller
                        name="done"
                        control={control}
                        defaultValue={task?.done ?? false}
                        render={({ field }) => (
                            <DoneRadio
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <BtnSubmit
                        isSubmiting={isSubmitting}
                        className="mt-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
                        text={"Update"}
                    />
                </form>
            </div>
        </div>
    );
}