"use client";

import React, { useState, useEffect, useRef } from "react";
import { CircleUser, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { FaCamera } from "react-icons/fa";
import { Myaxios } from "@/request/axios";
import { User } from "@/types";
import Profile_tools from "@/components/profile-update";
import Image from "next/image";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<Partial<User>>({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    createdAt: "",
    image: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [, setFile] = useState<File | null>(null);

  const cookieData = Cookies.get("user");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieData = Cookies.get("user");
      if (cookieData) {
        const parsed = JSON.parse(cookieData);
        setUserInfo(parsed);
      }
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      await handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const res = await Myaxios.post("/api/auth/edit-profile-img", formData);
      if (res.data.message == "success") {
        const data = await res.data.data;
        setUserInfo({ ...userInfo, image: data.image });
        const parsed: User = JSON.parse(cookieData!);
        Cookies.set("user", JSON.stringify({ ...parsed, image: data.image }));
        window.location.reload();
        if (data.imageUrl) {
          setUserInfo((prev) => ({ ...prev, image: data.imageUrl }));
        }
      }
    } catch (err) {
      <div className="hidden">{JSON.stringify(err)}</div>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-[320px]:p-0">
      <div className="bg-background shadow rounded-xl p-6 flex justify-between items-center max-[520px]:flex-col max-[520px]:items-start max-[380px]:items-center max-[520px]:gap-3 ">
        <div className="flex items-center gap-4 max-[380px]:flex-col ">
          <div className="relative cursor-pointer" onClick={handleAvatarClick}>
            {userInfo.image ? (
              <Image
                src={userInfo.image}
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <CircleUser size={80} className="text-foreground" />
            )}
            <div className="absolute bottom-0 -right-2  rounded-full p-1">
              <FaCamera size={16} />
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="max-[380px]:text-center">
            <h1 className="text-2xl font-bold max-[800px]:text-lg">
              {userInfo?.first_name} {userInfo?.last_name}
            </h1>
            <p className="max-[800px]:text-sm">{userInfo?.email}</p>
            <div className="flex items-center gap-2 text-sm mt-2">
              <Calendar size={16} />
              <p className="max-[800px]:text-sm">
                Qo&apos;shilgan:
                {new Date(userInfo.createdAt!).toLocaleDateString("uz-UZ")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-sm">
            {userInfo?.role}
          </span>
        </div>
      </div>

      <div className="rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Profil ma&apos;lumotlari</h2>
        <p className="text-sm text-gray-500 mb-4">
          Shaxsiy ma&apos;lumotlaringizni yangilashingiz mumkin.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Ism</label>
            <Input value={userInfo?.first_name} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium">Familiya</label>
            <Input value={userInfo?.last_name} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input value={userInfo?.email} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <Input value={userInfo?.role} readOnly />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Profile_tools userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
