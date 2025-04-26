import React from "react"

interface ChildrenType {
    children: React.ReactNode
}

interface sidebarMenuType {
    id: number
    title: string
    path: string
    Icon?: any
}

export type {ChildrenType, sidebarMenuType}
