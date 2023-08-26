import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import {format} from "date-fns";

const BillboardsPage = async ({
    params
}:{
    params: {
        storeId: string;
    }
}) => {

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => {
        return{
            id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "DDDD MM, yyyy")
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={billboards}/>
            </div>
        </div>
    );
}

export default BillboardsPage;