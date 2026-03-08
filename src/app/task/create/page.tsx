"use client";

import useTaskCreate from "@/app/task/create/task-create.hook";
import CustomInput from "@/shared/components/input/input.component";
import {BtnSubmit} from "@/shared/components/btnSubmit/btn-submit.component";
import CustomTextarea from "@/shared/components/customTextarea/custom-textarea.component";
import PrioritySelect from "@/shared/components/customPrioritySelect/priority-select.component";
import CustomSpanError from "@/shared/components/customSpanError/custom-span-error.component";

export default function UseTaskCreatePage() {
    const {
        handleSubmit,
        onSubmit,
        register,
        isSubmitting,
        errors
    } = useTaskCreate();

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
                                maxLength: 100
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
                                maxLength: 500
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
                                valueAsNumber: true
                            })}
                        />
                        {
                            errors.priority && (
                                <CustomSpanError message={errors.priority.message} />
                            )
                        }
                    </div>
                    <BtnSubmit
                        isSubmiting={isSubmitting}
                        className="mt-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
                        text={"Create"}
                    />
                </form>
            </div>
        </div>
    );
}