import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Switch } from './ui/switch'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCollection } from '@/hooks/use-collections'
import { toast } from 'sonner'
import { useCreateCollectionStore } from '@/stores/create-collection.store'
import { useUserStore } from '@/stores/user.store'
import { queryClient } from '@/lib/queryclient'
import { useNavigate } from 'react-router'

const createCollectionSchema = z.object({
  name: z.string({ error: "This field is required" }).min(1, 'Name is required'),
  description: z.string().optional(),
  enableDrm: z.boolean().optional()
})

type TCreateCollection = z.infer<typeof createCollectionSchema>

export default function CreateCollectionModal() {

  const form = useForm<TCreateCollection>({
    resolver: zodResolver(createCollectionSchema)
  })

  const { open, onOpenChange } = useCreateCollectionStore()

  const { mutate: createCollection, isPending } = useCreateCollection();

  const { user } = useUserStore()

  const navigate = useNavigate();

  const handleSubmit = (data: TCreateCollection) => {
    createCollection({
      ...data,
      userId: user?.id
    }, {
        onSuccess: (collection) => {
          toast.success('Collection created successfully!')
          queryClient.invalidateQueries({ queryKey: ['collections'] })
          form.reset();
          onOpenChange(false)
          navigate(`/collection/${collection.id}`);
        },
        onError: (error: Error) => {
            console.error('Error creating collection:', error);
        }
    });
  }

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a New Collection
          </DialogTitle>
          <DialogDescription>
            Provide details about your new collection here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="Collection Name" type="text" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full mt-4">
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea className="w-full" placeholder="Collection description" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className='w-full my-4'/>
            <div>
              <h2 className='text-base font-bold'>Security</h2>
              <p className='text-sm text-zinc-400'>Secure your collection to prevent unauthorized access and ensure privacy.</p>
              <FormField
                control={form.control}
                name="enableDrm"
                render={({ field }) => (
                  <FormItem className="w-full flex gap-4 items-center mt-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormLabel className="text-white">Enable DRM</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
            />
            </div>
          <DialogFooter className='mt-4'>
            <Button
              className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              Create
            </Button>
          </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
