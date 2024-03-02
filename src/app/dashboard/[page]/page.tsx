"use client";

import Header from "@/components/header";
import { getUser } from "@/lib/requisicoes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { VscLoading } from "react-icons/vsc";

import { usePathname, useRouter } from "next/navigation";
import Servicos from "./servicos/pageServices";
import Dashboard from "./dashboard/dashboardPage";
import ErrorPage from "@/components/errorPage";
import { UserList } from "@/lib/types";

import FormProfile from "./components/FormProfile";
import FormCompany from "./components/FormCompany";
const DashboardWrapper = () => {
  const [currentProfile, setCurrentProfile] = React.useState({});
  const [currentCompany, setCurrentCompany] = React.useState(null);
  const pathname = usePathname();

  const { data: session } = useSession();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", session?.user?.email, currentProfile, currentCompany],
    queryFn: async () => {
      const user: UserList = await getUser(
        session ? session?.user?.email ?? "" : ""
      );
      return user;
    },
  });

  const currentUser = user?.users[0];
  const profile = currentUser?.Profile;

  useEffect(() => {
    //console.log(user);
  }, [user]);

  //   Renderiza o componente apropriado com base no segmento do URL
  const renderPageComponent = () => {
    switch (pathname) {
      case "/dashboard/servicos":
        return <Servicos data={user} isLoading={isLoading} />;
      case "/dashboard/home":
        return <Dashboard />;
      default:
        return (
          <div className="   w-screen  h-screen top-0 left-0 fixed bg-slate-950 z-50 flex flex-col space-y-6 p-6 bg-opacity-80 backdrop-blur-lg">
            <ErrorPage />
          </div>
        );
    }
  };

  const [currentStep, setCurrentStep] = React.useState(0);

  return (
    <div className="flex  w-full flex-col">
      <Header data={user} isLoading={isLoading} />
      {isLoading || !session ? (
        <div className="loaderPage w-screen h-screen top-0 left-0 fixed bg-slate-950 z-50 flex justify-center items-center">
          <span>
            <VscLoading className="text-6xl text-slate-300 animate-spin" />
          </span>
        </div>
      ) : user ? (
        profile && currentUser?.companyId ? (
          renderPageComponent()
        ) : (
          <div className="   w-screen  h-screen top-0 left-0 fixed bg-slate-950 z-50 flex flex-col space-y-6 p-6 bg-opacity-80 backdrop-blur-lg">
            {currentStep === 0 && !profile ? (
              <FormProfile
                data={user}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                setCurrentProfile={setCurrentProfile}
                currentProfile={currentProfile}
              />
            ) : (
              <FormCompany
                data={user}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                setCurrentCompany={setCurrentCompany}
                currentCompany={currentCompany}
              />
            )}
          </div>
        )
      ) : (
        <>
          <div className="   w-screen  h-screen top-0 left-0 fixed bg-slate-950 z-50 flex flex-col space-y-6 p-6 bg-opacity-80 backdrop-blur-lg">
            <ErrorPage />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardWrapper;
