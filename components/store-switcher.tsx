"use client"

import { Store } from "@prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";

type PropoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PropoverTriggerProps {
    items : Store[];
}

export default function StoreSwitcher({
    className,
    items = []
} : StoreSwitcherProps) { 

    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item)=>({
        label: item.name,
        value: item.id,
    })); 

    const currStore = formattedItems.find((item)=>item.value === params.storeId);

    const [open, setOpen] = useState(false);

    const handleSelect = (store: {value: string, label: string}) => {
        setOpen(false);
        router.push(`/stores/${store.value}`);
    }

    return (
        <Popover open = {open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StIcon className="mr-2 h-4 w-4"/>
                    {currStore?.label || "Select store"}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search..."/>
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store)=>(
                                <CommandItem
                                    key={store.value}
                                    className="text-sm"
                                    onSelect={()=>handleSelect(store)}
                                >
                                    <StIcon className="mr-2 h-2 w-4"/>
                                    {store.label}
                                    <Check
                                        className={cn("ml-auto h-4 w-4",currStore?.value === store.value ? "opacity-100":"opacity-0")} 
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={
                                ()=>{
                                    setOpen(false);
                                    storeModal.onOpen();
                                }
                            }>
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}