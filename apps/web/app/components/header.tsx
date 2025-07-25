import { Boxes } from 'lucide-react'
import { ChevronsUpDown } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import SettingsMenu from "@/components/settings-menu"
import UserMenu from "@/components/user-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { useLocation, useNavigate, useParams } from 'react-router';
import { useGetCollections } from '@/hooks/use-collections';
import { useCreateCollectionStore } from '@/stores/create-collection.store';

export default function Header() {

  const { pathname } = useLocation()

  const { data: collections } = useGetCollections()
  const { onOpenChange } = useCreateCollectionStore()
  
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSelectCollection = (collectionId: string) => {
    navigate(`/collection/${collectionId}`);
  }

  return (
    <header className="border-b px-4 md:px-6 fixed w-full bg-background">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold font-mono mr-10">Nixy</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Select defaultValue="personal">
                  <SelectPrimitive.SelectTrigger
                    aria-label="Select account type"
                    asChild
                  >
                    <Button
                      variant="ghost"
                      className="focus-visible:bg-accent text-foreground h-8 p-1.5 focus-visible:ring-0"
                    >
                      <SelectValue placeholder="Select account type" />
                      <ChevronsUpDown
                        size={14}
                        className="text-muted-foreground/80"
                      />
                    </Button>
                  </SelectPrimitive.SelectTrigger>
                  <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </BreadcrumbItem>
              {pathname.includes("/collection") && collections && collections.length > 0 && (
                <>  
                  <BreadcrumbSeparator> | </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <Select 
                      defaultValue={collections.find(collection => collection.id === id)?.id}
                      value={collections.find(collection => collection.id === id)?.id} 
                      onValueChange={handleSelectCollection}
                    >
                      <SelectPrimitive.SelectTrigger
                        aria-label="Select project"
                        asChild
                      >
                        <Button
                          variant="ghost"
                          className="focus-visible:bg-accent text-foreground h-8 p-1.5 focus-visible:ring-0"
                        >
                          <SelectValue placeholder="Select project" />
                          <ChevronsUpDown
                            size={14}
                            className="text-muted-foreground/80"
                          />
                        </Button>
                      </SelectPrimitive.SelectTrigger>
                      <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 w-[200px]">
                        {collections && collections.length > 0 &&collections.map((collection) => (
                          <div className='flex flex-row items-center h-10 px-4 border-b py-2 hover:bg-accent hover:text-accent-foreground' key={collection.id} >
                            <Boxes
                              className='text-2xl text-purple-700 mr-2'
                            />                         
                            <SelectItem 
                              value={collection.id} 
                              onClick={() => handleSelectCollection(collection.id)}
                            >
                              {collection.name}
                            </SelectItem>
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </BreadcrumbItem>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => onOpenChange(true)}
                  >
                    Add new collection
                  </Button>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SettingsMenu />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
