'use client'

import useMain from "@/app/main/main.hook";
import {CircleUserRound, LogOut, Pencil, RefreshCcw, Loader2} from "lucide-react";
import Navbar from "@/shared/components/navbar/navbar.component";
import {BtnRedirect} from "@/shared/components/btnRedirect/btn-redirect";
import Logo from "@/shared/components/logo/logo.comonent";
import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import Footer from "@/shared/components/footer/footer.component";
import MainLayout from "@/shared/components/main/main.component";
import ShowTask from "@/shared/components/showTask/show-task.component";
import {BtnDelete} from "@/shared/components/btnDelete/btn-delete.component";
import {BtnUpdate} from "@/shared/components/btnUpdate/btn-update.component";
import NotFoundComponent from "@/shared/components/notFound/not-found.component";
import InternalErrorComponent from "@/shared/components/internalError/internal-error.component";
import LoadComponent from "@/shared/components/load/load.component";
import BtnDrawer from "@/shared/components/drawer/btn/btn-drawer.component";
import Drawer from "@/shared/components/drawer/ui/drawer.component";
import CustomInput from "@/shared/components/input/input.component";
import Pagination from "@/shared/components/pagination/pagination.component";

export default function Main() {
    const {
        isLoading,
        tasks,
        deleteById,
        updateTask,
        errorHttp,
        logout,
        changeStatus,
        open,
        toggleOpen,
        queries,
        setQueries,
        loadTask
    } = useMain();

    if (isLoading) {
        return <LoadComponent />;
    }

    if (errorHttp && errorHttp.code === 404) {
        return <NotFoundComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    if (errorHttp && errorHttp.code && errorHttp.code >= 500) {
        return <InternalErrorComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    return (
        <div>
            <Drawer open={open}>
                <div className={"mt-4 p-4"}>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">

                        <CustomInput
                            label="Search by title"
                            className={"border rounded p-2 text-white bg-transparent w-full"}
                            value={queries.title ?? ""}
                            onChange={(e) => setQueries(prev => ({ ...prev, title: e.target.value }))}
                        />

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">Status</label>
                            <select
                                className="border rounded p-2 text-white bg-zinc-900 w-full"
                                value={queries.done === undefined ? "" : String(queries.done)}
                                onChange={(e) => setQueries(prev => ({
                                    ...prev,
                                    done: e.target.value === "" ? undefined : e.target.value === "true"
                                }))}
                            >
                                <option value="">All</option>
                                <option value="true">Completed</option>
                                <option value="false">Pending</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-400">Priority</label>
                            <select
                                className="border rounded p-2 text-white bg-zinc-900 w-full"
                                value={queries.priority ?? ""}
                                onChange={(e) => setQueries(prev => ({
                                    ...prev,
                                    priority: e.target.value === "" ? undefined : (Number(e.target.value) as 0|1|2|3)
                                }))}
                            >
                                <option value="">All Priorities</option>
                                <option value="0">Low (0)</option>
                                <option value="1">Medium (1)</option>
                                <option value="2">High (2)</option>
                                <option value="3">Urgent (3)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-400">From</label>
                                <input
                                    type="date"
                                    className="border rounded p-2 text-white bg-zinc-900 text-sm"
                                    value={queries.createAtAfter ?? ""}
                                    onChange={(e) => setQueries(prev => ({ ...prev, createAtAfter: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-400">To</label>
                                <input
                                    type="date"
                                    className="border rounded p-2 text-white bg-zinc-900 text-sm"
                                    value={queries.createAtBefore ?? ""}
                                    onChange={(e) => setQueries(prev => ({ ...prev, createAtBefore: e.target.value }))}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setQueries({ pageNumber: 1, pageSize: 10 })}
                            className="mt-2 text-xs text-red-400 hover:underline self-end"
                        >
                            Clear Filters
                        </button>

                    </form>
                </div>
            </Drawer>

            <Navbar>
                <div className="flex items-center gap-4">
                    <Logo />
                    {loadTask && <Loader2 className="animate-spin text-blue-500 h-5 w-5" />}
                </div>

                <div className={"flex gap-3"}>
                    <BtnDrawer
                        open={open}
                        onFunc={toggleOpen}
                    />
                    <BtnRedirect
                        to={"/user/profile"}
                        icon={<CircleUserRound />}
                        className={"hover:bg-blue-600 transition-colors duration-250 p-2 "}
                    />
                    <BtnRedirect
                        to={"/task/create"}
                        icon={<Pencil />}
                        className={"hover:bg-green-600 transition-colors duration-250 p-2 "}
                    />
                    <BtnFunc
                        onClick={() => logout()}
                        icon={<LogOut />}
                        className={"hover:bg-red-400 transition-colors duration-250 p-2 "}
                    />
                </div>
            </Navbar>

            <MainLayout>
                {loadTask ? (
                    <div className="flex justify-center items-center py-20">
                        <LoadComponent />
                    </div>
                ) : (
                    <>
                        {tasks && tasks.items && tasks.items.map((item) => (
                            <ShowTask
                                key={item.id}
                                task={item}
                                buttons={
                                    <>
                                        <BtnDelete
                                            onClick={() => deleteById(item.id)}
                                        />
                                        <BtnUpdate
                                            onClick={() => updateTask(item.id)}
                                        />
                                        <BtnFunc
                                            onClick={() => changeStatus(item.id)}
                                            icon={<RefreshCcw />}
                                            className="text-gray-500 hover:bg-blue-500 hover:text-black transition duration-200"
                                        />
                                    </>
                                }
                            />
                        ))}

                        {tasks && tasks.items.length === 0 && (
                            <div className={"p-4 my-3 flex justify-center"}>
                                <h1 className={"text-3xl font-light text-white"}>No Tasks Found</h1>
                            </div>
                        )}

                        {tasks && (
                            <Pagination
                                currentPage={queries.pageNumber ?? 1}
                                totalPages={tasks.totalPages}
                                onPageChange={(page) => setQueries(prev => ({ ...prev, pageNumber: page }))}
                            />
                        )}
                    </>
                )}
            </MainLayout>

            <Footer logo={<Logo />} />
        </div>
    );
}