"use client";

import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const AlertDialogTrigger = ({ open, setOpen, handleConfirm }: any) => {
  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className="" asChild>
          <button className="Button violet">Delete account</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="w-full h-screen fixed inset-0 bg-black/50" />
          <AlertDialog.Content
            className="w-80 fixed top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-lg"
          >
            <AlertDialog.Title className="AlertDialogTitle">
              Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialog.Description>
            <div
              style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
            >
              <AlertDialog.Cancel asChild>
                <button className="Button mauve">Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onClick={handleConfirm}>
                <button className="Button red">Yes, delete account</button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default AlertDialogTrigger;
