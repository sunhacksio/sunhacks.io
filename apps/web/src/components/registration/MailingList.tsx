"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

const EmailFormValidator = z.object({
  email: z.string().email("Invalid email address"),
});

export default function MailingList() {
  const form = useForm<z.infer<typeof EmailFormValidator>>({
    resolver: zodResolver(EmailFormValidator),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("bg-black");
  const [arrowColor, setArrowColor] = useState("stroke-white");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  async function onSubmit(data: z.infer<typeof EmailFormValidator>) {
    setIsLoading(true);
    setSuccessMessage("");
    setButtonColor("bg-gray-500");
    setArrowColor("stroke-white");
    try {
      const response = await fetch("/api/registration/sendy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        setSuccessMessage("We will let you know!");
        setButtonColor("bg-green-500");
        setArrowColor("stroke-white");
      } else {
        setButtonColor("bg-red-500");
        setArrowColor("stroke-white");
      }
    } catch (error) {
      console.error("Error subscribing to mailing list:", error);
      setButtonColor("bg-red-500");
      setArrowColor("stroke-white");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 justify-items-start space-x-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex space-x-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" w-max-64">
                  <FormControl>
                    <Input
                      placeholder="your email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-10 h-10 flex items-center justify-center p-2 ${buttonColor}`}
              disabled={isLoading}
            >
              <svg
                className={`stroke-2 ${arrowColor}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M7.293 4.707L14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            </Button>
          </div>
        </form>
      </Form>
      {successMessage && (
		<div className="border rounded-full border-green-500 bg-green-100 text-green-700 p-2 mt-2 shadow-md">
		  {successMessage}
		</div>
      )}
    </div>
  );
}
