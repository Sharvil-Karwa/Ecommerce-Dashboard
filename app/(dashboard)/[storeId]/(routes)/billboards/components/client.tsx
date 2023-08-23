"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export const BillboardClient = () => {

    const router = useRouter();
    const params = useParams();



    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Billboards"
                    desc = "Great for promoting your business, event, or product."
                /> 
                <Button onClick={()=>{router.push(`/${params.storeId}/billboards/new`)}}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Billboard
                </Button>
            </div> 
            <Separator />
        </>
    )
}