"use client";

import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import UserTypeSelector from "../userTypeSelector";
import Collaborator from "../collaborator";
import { updateDocumentAcess } from "@/lib/actions/room.actions";


const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareModalProps) => {

  const user = useSelf();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocument = async () => {
    setIsLoading(true)

        await updateDocumentAcess({
            roomId,
            email: email,
            userType: userType as UserType,
            updatedBy: user.info as User
        })

        setIsLoading(false)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="gradient-blue flex h-9 gap-1 px-4 mr-2"
                disabled={currentUserType !== 'editor'}>
            <Image 
                src='/assets/icons/share.svg'
                alt='Share document'
                width={20}
                height={20}
                className="min-w-4 md:size-5"
            />
            <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[400px] rounded-xl border-none bg-doc bg-cover px-5 py-7 shadow-xl sm:min-w-[500px] !important">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="email" className="mt-6 text-blue-100">
            Email Address
        </Label>
        <div className="flex items-center gap-3">
            <div className="flex flex-1 bg-dark-400 rounded-md">
                <Input 
                    id="email"
                    type="email"
                    placeholder="Enter Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 flex-1 border-none bg-dark-400 focus-visible:ring-0 focus-visible:ring-offset-0 !important"/>

                <UserTypeSelector 
                    userType = {userType}
                    setUserType = {setUserType}
                />                    
            </div>

            <Button type="submit" onClick={shareDocument} 
                    className="gradient-blue flex h-full gap-1 px-5"
                    disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Invite'}
            </Button>
        </div>

        <div className="my-2 space-y-2">
            <ul className="flex flex-col">
                {collaborators.map((collaborator) => (
                    <Collaborator 
                        key={collaborator.id}
                        email={collaborator.email}
                        collaborator={collaborator}
                        creatorId={creatorId}
                        roomId={roomId}
                        user={user.info as User}
                    />
                ))}
            </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
