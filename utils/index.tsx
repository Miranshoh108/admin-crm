import { AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { CircleUser, LogOut, Settings } from "lucide-react";

export const sidebarLinks = [
  { name: "Asosiy", icon: <AiOutlineHome />, path: "/" },
  { name: "Menagerlar", icon: <AiOutlineUsergroupAdd />, path: "/menagers" },
  { name: "Adminlar", icon: <AiOutlineUsergroupAdd />, path: "/admins" },
  { name: "Ustozlar", icon: <FaChalkboardTeacher />, path: "/teachers" },
  { name: "Studentlar", icon: <FaUserGraduate />, path: "/students" },
  { name: "Guruhlar", icon: <BsPeople />, path: "/groups" },
];
export const other_links = [
  { name: "Sozlamalar", icon: <Settings />, path: "/settings" },
  { name: "Profile", icon: <CircleUser />, path: "/profile" },
];
