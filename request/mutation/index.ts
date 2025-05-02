import { notificationApi } from "@/shared/generics/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { api } from "../index";
import { AddType, EditProfileType, TatilType, User } from "@/@types";
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
      localStorage.setItem("sadad", JSON.stringify(res));
      Cookie.set("token", res.data.data.token);
      Cookie.set("user", JSON.stringify(res.data.data));
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
      return api.post("/api/staff/edited-admin", data);
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
      return api.post("/api/staff/create-admin", data);
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
      return api.post("/api/auth/edit-profile", data);
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
      return api.post("/api/staff/leave-staff", data);
    },
    onSuccess() {
      notify("chiq");
    },
  });
};
