
'use client'
import useMain from "@/app/main/main.hook";

export default function Main() {
    const {
        isLoading
    } = useMain()
    return (
        <div>
            <h1>MAIN INSIDE</h1>
        </div>
    )
}