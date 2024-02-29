"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
const queryClient = new QueryClient();
import { SessionProvider } from "next-auth/react";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
