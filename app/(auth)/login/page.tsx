import React from "react";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";


const LoginPage = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-[30%] items-center max-[1100px]:w-[50%] max-[650px]:w-[90%]">
        <div className="border h-full flex justify-center items-center ">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
