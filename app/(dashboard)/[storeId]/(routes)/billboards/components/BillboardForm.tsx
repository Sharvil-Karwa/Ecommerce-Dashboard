"use client"

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client"
import { Trash } from "lucide-react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter} from "next/navigation";
import { AlertModal } from "@/components/modal/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface BillboardFormProps {
    initialData: Billboard | null;
} 

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
}) 

type BillboardFormValues = z.infer<typeof formSchema>;

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const desc = initialData ? "Edit your billboard" : "Create a new billboard";
    const toastMsg = initialData ? "Billboard updated successfully" : "Billboard created successfully";
    const action = initialData ? "Save Changes" : "Create Billboard";


    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    const onSubmit = async (values: BillboardFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh();
            toast.success("Store updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    } 

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted successfully");
        } catch (error) {
            toast.error("Make sure you don't have any products in your store");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return(
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading} 
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    desc={desc} 
                /> 
                {
                    initialData && (
                        <Button
                            disabled={loading}
                            variant="destructive"
                            size="icon"
                            onClick={() => setOpen(true)}
                        >
                            <Trash className="h-4 w-4"/>
                        </Button>
                    )
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="label"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field}/>
                                    </FormControl> 
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}