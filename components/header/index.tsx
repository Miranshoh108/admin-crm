import {Bell, MessageCircleMore} from "lucide-react"
import BreadcrumbComponent from "../breadcrumb"
import {ModeToggle} from "../change-theme-btn"

const Header = () => {
    return (
        <header className="flex justify-between items-center gap-[15px] w-full py-[8px] px-[15px] border-b">
            <nav>
                <BreadcrumbComponent />
            </nav>

            <nav className="flex justify-end items-center gap-[20px]">
                <nav className="flex justify-center items-center *:cursor-pointer gap-[10px] *:!text-[11px]">
                    <Bell />
                    <MessageCircleMore />
                </nav>
                <ModeToggle />
            </nav>
        </header>
    )
}

export default Header
