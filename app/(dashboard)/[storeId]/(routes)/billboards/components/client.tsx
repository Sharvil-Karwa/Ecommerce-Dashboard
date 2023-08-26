"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    desc = "Great for promoting your business, event, or product."
                /> 
                <Button onClick={()=>{router.push(`/${params.storeId}/billboards/new`)}}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Billboard
                </Button>
            </div> 
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label"/>
        </>
    )
}