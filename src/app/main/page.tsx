'use client'

import useMain from "@/app/main/main.hook";
import {CircleUserRound, LogOut, Pencil, RefreshCcw} from "lucide-react";
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

export default function Main() {
    const {
        isLoading,
        tasks,
        deleteById,
        updateTask,
        errorHttp,
        logout,
        changeStatus
    } = useMain();

    if (isLoading) {
        return <LoadComponent />;
    }

    if (errorHttp && errorHttp.code && errorHttp.code === 404) {
        return <NotFoundComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    if (errorHttp && errorHttp.code && errorHttp.code >= 500) {
        return <InternalErrorComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    return (
        <div>
            <Navbar>
                <Logo />
                <div className={"flex gap-3"} >
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
                            onClick={() => { logout() }}
                            icon={<LogOut />}
                            className={"hover:bg-red-400 transition-colors duration-250 p-2 "}
                    />
                </div>
            </Navbar>
            <MainLayout>

                {tasks && tasks.items && tasks?.items.map((item) => (
                    <ShowTask
                        key={item.id}
                        task={item}
                        buttons={
                            <>
                                <BtnDelete
                                    onClick={() => { deleteById(item.id).then(r => r) } }
                                />
                                <BtnUpdate
                                    onClick={() => { updateTask(item.id) } }
                                />
                                <BtnFunc
                                    onClick={() => changeStatus(item.id) }
                                    icon={<RefreshCcw />}
                                    className={`
                                        text-gray-500
                                        hover:bg-blue-500
                                        hover:text-black
                                        transition duration-200
                                    `}
                                />
                            </>
                        }
                    ></ShowTask>
                ))}

                {(tasks && tasks.items.length === 0 ) && (
                    <div className={"p-4 my-3 flex justify-center "} >
                        <h1 className={"text-3xl font-light"} >No Tasks</h1>
                    </div>
                )}

            </MainLayout>
            <Footer logo={<Logo />} />
        </div>
    );
}