"use client"
import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ThemeProvider } from "./themeProvider";
import type { ChildrenType } from "@/types";

const MainProvider = ({ children }: ChildrenType) => {
    const [queryClient] = useState(new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MainProvider;
