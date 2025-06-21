import { Loader2, Plus } from "lucide-react"
import { useState } from "react"

import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateLeaveRequest } from "../../hooks/api/leave-request.hooks"
import { toast } from "sonner"

const schema = z.object({
  startDate: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  endDate: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  reason: z.string(),
})

type Schema = z.infer<typeof schema>

export const DialogCreateLeaveRequest = () => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, formState, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: "",
      endDate: "",
      reason: "",
    }
  })

  const { isValid } = formState

  const { mutateAsync, isPending } = useCreateLeaveRequest()

  const onSubmit = async (data: Schema) => {
    await mutateAsync({
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
    })

    toast("Leave request created successfully")

    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Request Leave
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Leave Request</DialogTitle>
          <DialogDescription>Fill in the details for your leave request. All fields are required.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for your leave request..."
              {...register("reason")}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !isValid}>
              {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting</> : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
