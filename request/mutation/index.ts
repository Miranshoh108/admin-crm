import { notificationApi } from "@/shared/generics/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { Myaxios } from "../axios";
import { TatilType, User } from "@/types";
import { AddType } from "@/components/admins-table/admin-add";
import { EditProfileType } from "@/components/profile-update";
import { AddTeacherType } from "@/components/teachers-table/teacher-add";
import { AddGroupType } from "@/components/groups/group_add";
const notify = notificationApi();
export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: object) =>
      axios({
        url: "https://admin-crm.onrender.com/api/auth/sign-in",
        method: "POST",
        data: data,
      }),
    onSuccess(res) {
      Cookie.set("token", res.data.data.token, { expires: 1 / 24 });
      Cookie.set("user", JSON.stringify(res.data.data), { expires: 1 / 24 });
      notify("login");
    },
    onError() {
      notify("wrong_login");
    },
  });
};

export const editCase = () => {
  const queryClient = useQueryClient();
  return (data: any) => {
    return queryClient.setQueryData(["admins"], (old: User[]) => {
      return old.map((value) =>
        value._id === data._id ? { ...value, ...data } : value
      );
    });
  };
};

export const useEditMutation = () => {
  const editCases = editCase();
  return useMutation({
    mutationKey: ["edit"],
    mutationFn: (data: object) => {
      editCases(data);
      return Myaxios.post("/api/staff/edited-admin", data);
    },
  });
};

export const deleteAdminCase = () => {
  const queryClient = useQueryClient();
  return (data: any) => {
    return queryClient.setQueryData(["admins"], (old: User[]) => {
      return old.map((value) =>
        value._id === data._id ? { ...value, ...data } : value
      );
    });
  };
};

export const AddAdminCase = () => {
  const queryClient = useQueryClient();
  return (data: any) => {
    return queryClient.setQueryData(["admins"], (old: User[]) => {
      return [...old, { ...data }];
    });
  };
};

export const useAddAdminMutaion = () => {
  const AddAdminCas = AddAdminCase();
  return useMutation({
    mutationKey: ["addFn"],
    mutationFn: (data: AddType) => {
      AddAdminCas(data);
      return Myaxios.post("/api/staff/create-admin", data);
    },
    onSuccess(data) {
      notify("add");
      console.log(data);
    },
  });
};

export const useEditProfileMutaion = () => {
  return useMutation({
    mutationKey: ["editProfile"],
    mutationFn: (data: EditProfileType) => {
      return Myaxios.post("/api/auth/edit-profile", data);
    },
    onSuccess() {
      notify("edit");
    },
  });
};

export const TatilCase = () => {
  const queryClient = useQueryClient();
  return (data: any) => {
    return queryClient.setQueryData(["admins"], (old: User[]) => {
      return old.map((value) =>
        value._id === data._id ? { ...value, ...data } : value
      );
    });
  };
};

export const useTatildaMutaion = () => {
  const tatil = TatilCase();
  return useMutation({
    mutationKey: ["tatil"],
    mutationFn: (data: TatilType) => {
      tatil(data);
      return Myaxios.post("/api/staff/leave-staff", data);
    },
    onSuccess() {
      notify("chiq");
    },
  });
};

export const AddTaecherCase = () => {
  const queryClient = useQueryClient();
  return (data: any) => {
    return queryClient.setQueryData(["teacher"], (old: User[]) => {
      return [...old, { ...data }];
    });
  };
};
export const useAddTeacherMutaion = () => {
  const AddTeacherCas = AddTaecherCase();
  return useMutation({
    mutationKey: ["teacher"],
    mutationFn: async (data: AddTeacherType) => {
      AddTeacherCas(data);
      return Myaxios.post("/api/teacher/create-teacher", data).then((res) =>
        console.log(res)
      );
    },
    onSuccess(data) {
      notify("addTeacher");
      console.log(data);
    },
  });
};
export const AddGroupCase = () => {
  const queryClient = useQueryClient();
  return (data: any) => {
    return queryClient.setQueryData(["groups"], (old: User[]) => {
      return [...old, { ...data }];
    });
  };
};
export const useAddGroupMutation = () => {
  const AddGroupCas = AddGroupCase();
  return useMutation({
    mutationKey: ["groups"],
    mutationFn: async (data: AddGroupType) => {
      AddGroupCas(data);
      return Myaxios.post("/api/group/create-group", data);
    },
    onSuccess(data) {
      notify("addGroup");
      console.log(data);
    },
  });
};
