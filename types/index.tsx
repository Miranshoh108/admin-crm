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

export interface TeacherType {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  image: string | null;
  field: string;
  salary: number;
  status: string;
  is_deleted: boolean;
  groups: any[];
  work_date: string;
  work_end: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GroupType {
  createdAt: string;
  disable: boolean;
  end_group: null;
  is_deleted: boolean;
  name: string;
  started_group: string;
  students: object[];
  teacher: TeacherType;
  updatedAt: string;
  _id: string;
}
