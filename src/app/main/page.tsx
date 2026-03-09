'use client'

import useMain from "@/app/main/main.hook";
import {ArrowUpToLine, CircleUserRound, Loader2, LogOut, Pencil} from "lucide-react";
import Navbar from "@/shared/components/navbar/navbar.component";
import {BtnRedirect} from "@/shared/components/btnRedirect/btn-redirect";
import Logo from "@/shared/components/logo/logo.comonent";
import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import {useMemo} from "react";
import {AuthService} from "@/core/service/auth/auth.service";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Footer from "@/shared/components/footer/footer.component";
import MainLayout from "@/shared/components/main/main.component";
import ShowTask from "@/shared/components/showTask/show-task.component";
import {BtnDelete} from "@/shared/components/btnDelete/btn-delete.component";
import {BtnUpdate} from "@/shared/components/btnUpdate/btn-update.component";

export default function Main() {
    const router = useRouter();
    const { isLoading, tasks, deleteById, updateTask } = useMain();
    const authService = useMemo(() => new AuthService(), []);

    if (isLoading) {
        return (
            <div className="grid place-items-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-14 w-14 text-blue-500 animate-spin" />
                </div>
            </div>
        );
    }

    function logout() {
        authService.logout();
        toast.success("Bye Bye")
        router.push("/")
    }

    return (
        <div>
            <Navbar>
                <Logo />
                <div className={"flex gap-3"} >
                    <BtnRedirect
                        to={"/user/profile"}
                        icon={<CircleUserRound />}
                    />
                    <BtnRedirect
                        to={"/task/create"}
                        icon={<Pencil />}
                    />
                    <BtnFunc
                            onClick={() => { logout() }}
                            icon={<LogOut />}
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