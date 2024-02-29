import Sidebar from "@/components/Sidebar";
import { parseCookies } from "nookies";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-slate-950 flex w-full">
      <Sidebar />

      {children}
    </div>
  );
}
