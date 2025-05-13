"use client";
import { CourseType, editCourseType } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Clock, Users, Pencil, Trash2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface MangaCourseCardProps {
  course: CourseType;
  onEdit: (data: editCourseType) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  freeze: (id: string) => void;
  unfreeze: (id: string) => void;
}

export const CourseCard = ({
  course,
  onEdit,
  onDelete,
  isDeleting,
  freeze,
  unfreeze,
}: MangaCourseCardProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formattedPrice = new Intl.NumberFormat("en-US").format(course.price);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      duration: course?.duration || "",
      price: course?.price || 0,
    },
  });
  const onSubmit = (data: { duration: string; price: number }) => {
    setLoading(true);
    if (!course?._id) return;
    setTimeout(() => {
      onEdit({
        course_id: course._id,
        ...data,
      });
      setLoading(false);
    }, 500);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };
  // const freeze = (id: string) => {
  //   Myaxios.put("/api/course/freeze-course", { course_id: id }).then((res) =>
  //     toast.success(res.data.message)
  //   );
  // };
  return (
    <>
      <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300 border border-muted bg-gradient-to-br from-background to-muted/10 flex flex-col justify-between">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                {course.name.name}
              </CardTitle>
              <CardDescription className="mt-1 text-muted-foreground">
                {course.description}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {formattedPrice} UZS
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col justify-between  ">
          <div className="grid gap-4">
            <div className="flex items-center space-x-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{course.duration}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">15 students</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center  justify-between  ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="flex items-center gap-1"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            size="sm"
            onClick={() => onDelete(course._id)}
            disabled={isDeleting}
            className="flex items-center gap-1 !bg-red-500 text-white hover:!bg-red-600"
          >
            {isDeleting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {isDeleting ? "O'chirilmoqda..." : "O'chirish"}
          </Button>
          {course.is_freeze ? (
            <Button
              size="sm"
              onClick={() => unfreeze(course._id)}
              className="flex items-center gap-1 bg-red-500 text-white"
            >
              Eritish
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => freeze(course._id)}
              className="flex items-center gap-1 bg-blue-500 text-white"
            >
              Muzlatish
            </Button>
          )}
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kursni Tahrirlash</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="duration">Davomiylik</Label>
              <Input
                id="duration"
                placeholder="1 yil"
                {...register("duration")}
              />
            </div>
            <div>
              <Label htmlFor="price">Narx (UZS)</Label>
              <Input
                id="price"
                type="number"
                placeholder="2000000"
                {...register("price", { valueAsNumber: true })}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Bekor qilish
              </Button>
              <Button type="submit">{loading ? <Loader /> : "Saqlash"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
