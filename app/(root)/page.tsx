"use client";

import { Modal } from "@/components/ui/modal";
// import { UserButton } from "@clerk/nextjs";
// import { IconName } from 'lucide-react';


const setupPage = () => {
  return (
    <div className="p-4">
      {/* <UserButton afterSignOutUrl="/" />
       */}
      
      <Modal title="Setup" description="Setup your account" isOpen={true} onClose={() => {}}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Setup</h1>
          <p className="text-sm text-gray-500">Setup your account</p>
        </div>
      </Modal>
    </div>
  );
} 

export default setupPage;
