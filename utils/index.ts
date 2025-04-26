import {sidebarMenuType} from "@/@types"
import {
    Boxes,
    ContactRound,
    HomeIcon,
    Settings,
    ShieldUser,
    UserCircle,
    UserRoundPen,
    Users,
} from "lucide-react"

export const sidebar_menu: sidebarMenuType[] = [
    {
        id: 1,
        title: "Asosiy",
        path: "/",
        Icon: HomeIcon,
    },
    {
        id: 2,
        title: "Menejerlar",
        path: "/managers",
        Icon: ShieldUser,
    },
    {
        id: 3,
        title: "Adminlar",
        path: "/admins",
        Icon: ContactRound,
    },
    {
        id: 4,
        title: "Ustozlar",
        path: "/teachers",
        Icon: UserRoundPen,
    },
    {
        id: 5,
        title: "O'quvchilar",
        path: "/students",
        Icon: Users,
    },
    {
        id: 6,
        title: "Guruhlar",
        path: "/groups",
        Icon: Boxes,
    },
]
export const other_menu: sidebarMenuType[] = [
    {
        id: 1,
        title: "Sozlamalar",
        path: "/settings",
        Icon: Settings,
    },
    {
        id: 2,
        title: "Profil",
        path: "/profile",
        Icon: UserCircle,
    },
]

export const breadcrumb_menu: sidebarMenuType[] = [
    {
        id: 1,
        title: "Asosiy",
        path: "/",
    },
    {
        id: 2,
        title: "Menejerlar",
        path: "/managers",
    },
    {
        id: 3,
        title: "Adminlar",
        path: "/admins",
    },
    {
        id: 4,
        title: "Ustozlar",
        path: "/teachers",
    },
    {
        id: 5,
        title: "O'quvchilar",
        path: "/students",
    },
    {
        id: 6,
        title: "Guruhlar",
        path: "/groups",
    },
    {
        id: 1,
        title: "Sozlamalar",
        path: "/settings",
    },
    {
        id: 2,
        title: "Profil",
        path: "/profile",
    },
]
