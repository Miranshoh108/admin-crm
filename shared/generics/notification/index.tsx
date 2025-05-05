import { toast } from "sonner";

type notificationApi =
  | "login"
  | "wrong_login"
  | "LogOut"
  | "add"
  | "edit"
  | "error_admin"
  | "chiq"
  | "addTeacher"
  | "addGroup";

export const notificationApi = () => {
  const notify = (type: notificationApi) => {
    switch (type) {
      case "login":
        return toast.success("Siz tizimga kirdingiz");
      case "wrong_login":
        return toast.error("Nimadur tizimga kirishga xalaqit beryapti!");
      case "LogOut":
        return toast.success("Muvoffaqiyatli chiqdingiz!");
      case "add":
        return toast.success("Muvoffaqiyatli Admin Qo'shdingiz!");
      case "edit":
        return toast.success("Muvoffaqiyatli O'zgartingiz!");
      case "error_admin":
        return toast.error("Siz adminsiz manager boshqaradi!");
      case "chiq":
        return toast.success("Siz tatilga chiqdingiz!");
      case "addTeacher":
        return toast.success("Muvoffaqiyatli Ustoz Qo'shdingiz!");
      case "addGroup":
        return toast.success("Muvoffaqiyatli Guruh Qo'shdingiz!");
    }
  };
  return notify;
};
