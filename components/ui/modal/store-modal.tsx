"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../modal"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form"
import { Input } from "../input"
import { Button } from "../button"

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () =>{ 

    const StoreModal = useStoreModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Modal 
        title="Create Store"
        description="Create a new store"
        isOpen={StoreModal.isOpen}
        onClose={StoreModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="name" render={({field})=>(
                            <FormItem>
                                <FormLabel> Name </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="E-Commerce" />
                                </FormControl>
                                <FormMessage>Enter the name of your store</FormMessage>
                            </FormItem>
                        )} />
                        <div className="pt-6 space-x-2">
                            <Button variant="outline" onClick={StoreModal.onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    );
};