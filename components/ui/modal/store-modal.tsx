"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../modal"

export const StoreModal = () =>{ 

    const StoreModal = useStoreModal();

    return (
        <Modal 
        title="Create Store"
        description="Create a new store"
        isOpen={StoreModal.isOpen}
        onClose={StoreModal.onClose}
    >
        Future content
    </Modal>
    );
};