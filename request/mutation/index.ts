"use client"
import {useMutation} from "@tanstack/react-query"
import {api} from ".."
import Cookies from "js-cookie"
import {toast} from "sonner"
import {useRouter} from "next/navigation"

export const useLoginMutation = () => {
    const router = useRouter()
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data: object) =>
            api
                .post("/api/auth/sign-in", {
                    ...data,
                })
                .then((res) => res.data.data),
        onSuccess: (data) => {
            Cookies.set("token", data.token, {expires: 7 / 24})
            Cookies.set("user", JSON.stringify(data), {expires: 7 / 24})
            toast.success("Login successful")
            router.push("/")
        },
        onError: () => {
            toast.error("Email or password is incorrect !")
        },
    })
}
