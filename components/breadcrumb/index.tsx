"use client"
import React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb"

import {usePathname} from "next/navigation"
import {breadcrumb_menu} from "@/utils"

const BreadcrumbComponent = () => {
    const pathname = usePathname()
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumb_menu.map(
                    (value) =>
                        value.path === pathname && (
                            <BreadcrumbItem key={value.id}>
                                <BreadcrumbPage>{value.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbComponent
