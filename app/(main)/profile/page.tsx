"use client"

import {useEffect, useState} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import Cookies from "js-cookie"

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        image: "",
        address: "",
    })

    useEffect(() => {
        const userCookie = Cookies.get("user")
        if (userCookie) {
            const user = JSON.parse(userCookie)
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                image: user.image || "/placeholder-avatar.jpg",
                address: user.address || "", 
            })
        }
    }, [])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target
        setFormData((prev) => {
            const updated = {...prev, [name]: value}
            Cookies.set(
                "user",
                JSON.stringify({
                    ...JSON.parse(Cookies.get("user") || "{}"),
                    ...updated,
                }),
                {expires: 7}
            )
            return updated
        })
    }

    const handleEditToggle = () => {
        if (isEditing) {
            const updatedUser = {
                ...JSON.parse(Cookies.get("user") || "{}"),
                ...formData,
            }
            Cookies.set("user", JSON.stringify(updatedUser), {expires: 7})
        }
        setIsEditing(!isEditing)
    }

    return (
        <div className="p-6 w-[50%] space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage
                        src={formData.image || "/placeholder-avatar.jpg"}
                        alt="User avatar"
                    />
                    <AvatarFallback>
                        {formData.first_name?.[0] || "?"}
                        {formData.last_name?.[0] || ""}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-semibold">
                        {formData.first_name} {formData.last_name}
                    </h2>
                    <p className="text-muted-foreground">{formData.email}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="First Name"
                    />
                    <Input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Last Name"
                    />
                </div>
                <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Email"
                />
                <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Address"
                />
            </div>

            <div className="flex">
                <Button onClick={handleEditToggle}>
                    {isEditing ? "Save" : "Edit Profile"}
                </Button>
            </div>
        </div>
    )
}
