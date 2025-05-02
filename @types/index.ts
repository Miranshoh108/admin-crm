import { ReactNode } from "react";

export interface ChildrenType {
  children: ReactNode;
}

export interface SidebarType {
  name: string;
  icon: ReactNode;
  path: string;
}
export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  role?: string;
  status?: string;
  token?: string;
  active?: boolean;
  is_deleted?: boolean;
  createdAt?: string | number | Date;
  updatedAt?: string;
  work_date?: string;
  work_end?: string | null;
  last_active_date?: string;
}
export interface TatilType {
  _id: string;
  start_date: string;
  end_date: string;
  reason: string;
}
export interface AddType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "staff";
  status?: "active" | "inactive";
}

export interface EditProfileType {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    avatar?: string;
  }
  