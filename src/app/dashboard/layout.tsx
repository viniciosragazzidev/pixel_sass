import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();

  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <div className=" bg-slate-950 flex w-full">
      <Sidebar />

      {children}
    </div>
  );
}
