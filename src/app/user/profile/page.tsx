"use client"

import useProfile from "@/app/user/profile/profile.hook";
import NotFoundComponent from "@/shared/components/notFound/not-found.component";
import InternalErrorComponent from "@/shared/components/internalError/internal-error.component";
import {BtnRedirect} from "@/shared/components/btnRedirect/btn-redirect";
import Dropdown from "@/shared/components/dropdown/dropdown.component";
import Modal from "@/shared/components/modal/model.component";
import BtnFunc from "@/shared/components/btnFunc/btnFunc.component";
import {ArrowUpToLine, Trash2} from "lucide-react";

export default function ProfilePage() {

    const {
        errorHttp,
        user,
        openDelete,
        setOpenDelete,
        deleteUser
    } = useProfile();

    if (errorHttp && errorHttp.code && errorHttp.code === 404 && user == null) {
        return <NotFoundComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    if (errorHttp && errorHttp.code && errorHttp.code >= 500) {
        return <InternalErrorComponent message={errorHttp.message} path={errorHttp.path} />;
    }

    return (
        <div className="grid place-items-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-2xl border">
                <h1 className={"text-2xl"} >{user?.userName}</h1>
                <p>{user?.email}</p>
                {user?.emailConfirmed ?
                    ( <p className={"text-red-700"} >Email not confirmed</p> ) :
                    ( <p className={"text-green-600"} >Email confirmed! </p> )
                }

                <Dropdown label={"Actions"} >
                    <BtnRedirect
                        to={"/user/update"}
                        icon={<ArrowUpToLine />}
                        className={"w-full flex justify-center px-4 py-2 text-yellow-500 hover:bg-yellow-400 hover:text-black transition duration-250 "}
                    />
                    <BtnFunc
                        onClick={() => setOpenDelete(true)}
                        className="w-full flex justify-center px-4 py-2 text-red-500 hover:bg-red-500/20"
                        icon={<Trash2 />}
                    />
                </Dropdown>

                <Modal
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    title="Delete account"
                >
                    <p className="mb-4">
                        Are you sure you want to delete your account?
                    </p>

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={() => setOpenDelete(false)}
                            className="px-4 py-2 rounded bg-gray-700"
                        >
                            NO
                        </button>

                        <BtnFunc
                            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
                            onClick={() => deleteUser()}
                        >
                            YES
                        </BtnFunc>

                    </div>
                </Modal>
            </div>
        </div>
    )
}