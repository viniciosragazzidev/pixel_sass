"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import FormService from "./FormService";

const ButtonDrawerService = ({ isNewUser, setIsNewUser }: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger>
          {" "}
          <Button className="flex gap-1  py-2" variant="primary">
            <FaPlus />{" "}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="magicpattern border-none h-screen overflow-hidden ">
          <FormService
            isNewUser={isNewUser}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ButtonDrawerService;
