"use client"
import { useState } from "react"
import {other_menu, sidebar_menu} from "@/utils"
import {usePathname, useRouter} from "next/navigation"
import {Button} from "../ui/button"
import {LogOut} from "lucide-react"
import Cookies from "js-cookie"
import {toast} from "sonner"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className="w-[280px] h-screen p-4 border-r flex flex-col gap-[10px] sticky top-0">
            <div>
                <h2 className="font-bold">ADMIN CRM</h2>
            </div>

            <div className="flex flex-col gap-[10px]">
                <h2>Menu</h2>
                {sidebar_menu.map(({Icon, title, id, path}) => (
                    <Button
                        onClick={() => router.push(path)}
                        key={id}
                        className={`flex items-center gap-4 w-full justify-start cursor-pointer ${
                            pathname === path &&
                            "bg-primary text-accent hover:bg-primary hover:text-accent"
                        }`}
                        variant="outline">
                        <Icon />
                        <h2>{title}</h2>
                    </Button>
                ))}
            </div>

            <div className="flex flex-col gap-[10px]">
                <h2>Boshqalar</h2>
                {other_menu.map(({Icon, title, id, path}) => (
                    <Button
                        onClick={() => router.push(path)}
                        key={id}
                        className={`flex items-center gap-4 w-full justify-start cursor-pointer ${
                            pathname === path &&
                            "bg-primary text-accent hover:bg-primary hover:text-accen"
                        }`}
                        variant="outline">
                        <Icon />
                        <h2>{title}</h2>
                    </Button>
                ))}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className={`flex items-center p-4 w-full mt-4 justify-start cursor-pointer border-transparent shadow-none hover:border-accent `}>
                            <LogOut className="text-2xl" />
                            Chiqish
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Chiqishni xohlaysizmi?</DialogTitle>
                        </DialogHeader>
                        <DialogFooter className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}>
                                Yo‘q
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    Cookies.remove("user")
                                    Cookies.remove("token")
                                    toast.success("tizimdan chiqdingiz")
                                    router.push("/login")
                                    setOpen(false)
                                }}>
                                Ha, chiqaman
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Sidebar
