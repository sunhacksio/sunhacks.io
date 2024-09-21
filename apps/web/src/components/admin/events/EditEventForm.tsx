"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { events } from "db/schema";
import { DateTimePicker } from "@/components/shadcn/ui/date-time-picker/date-time-picker";
import { parseAbsolute, getLocalTimeZone } from "@internationalized/date";
import { newEventValidator } from "@/validators/shared/newEvent";
import { useState } from "react";
import { Shell } from "lucide-react";
import { useRouter } from "next/navigation";
import { editEvent } from "@/actions/admin/event-action";
import c from "config";

interface EditEventFormProps {
  event: {
    id: number;
    title: string;
    description: string;
    type: string;
    host: string | null;
    startTime: Date;
    endTime: Date;
    pointsWorth: number;
  };
}

const formSchema = newEventValidator.merge(
  z.object({
    type: z.enum(Object.keys(c.eventTypes) as any),
  })
);

export default function EditEventForm({ event }: EditEventFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      type: event.type as any,
      host: event.host,
      startTime: event.startTime,
      endTime: event.endTime,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await editEvent({
        eventId: event.id,
        ...values,
      });
      setLoading(false);
      if (result.data?.success) {
        alert("Event Updated Successfully!");
        router.push("/admin/events");
      }
    } catch (error) {
      setLoading(false);
      alert("Failed to update event, please try again. Error:\n\n" + error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Generally it's best to keep this short and concise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="You can also include any resources / links that would be helpful for the event here!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an Event Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(c.eventTypes).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host (Optional)</FormLabel>
                <FormControl>
                  <Input {...(field as any)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Start</FormLabel>
                <DateTimePicker
                  value={parseAbsolute(field.value.toISOString(), getLocalTimeZone())}
                  onChange={(date) => {
                    field.onChange(date.toDate(getLocalTimeZone()));
                  }}
                  shouldCloseOnSelect={false}
                  granularity={"minute"}
                  label="Event Start"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event End</FormLabel>
                <DateTimePicker
                  value={parseAbsolute(field.value.toISOString(), getLocalTimeZone())}
                  onChange={(date) => {
                    field.onChange(date.toDate(getLocalTimeZone()));
                  }}
                  shouldCloseOnSelect={false}
                  granularity={"minute"}
                  label="Event End"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loading ? (
          <p className="flex justify-center gap-x-1">
            Updating Event <Shell className="animate-spin" />
          </p>
        ) : (
          <Button type="submit">Update Event</Button>
        )}
      </form>
    </Form>
  );
}
