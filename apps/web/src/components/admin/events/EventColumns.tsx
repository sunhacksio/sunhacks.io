"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { events } from "db/schema";
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import c from "config";
import { db, eq } from "db";
import { deleteEvent } from "@/actions/admin/event-action";
import { revalidatePath } from "next/cache";

// const userValidator = createSelectSchema(users).merge(
// 	z.object({
// 		registrationData: createSelectSchema(registrationData),
// 		profileData: createSelectSchema(profileData).merge(
// 			z.object({
// 				skills: z.array(z.string()),
// 			})
// 		),
// 	})
// );

export const eventValidator = createSelectSchema(events);

export type eventTableValidatorType = Pick<
	z.infer<typeof eventValidator>,
	"title" | "startTime" | "endTime" | "id" | "type" | "pointsWorth"
>;

export const columns: ColumnDef<eventTableValidatorType>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<span className="flex items-center gap-x-3 font-bold">
				{row.original.title}{" "}
				<Badge
					className="text-sm"
					variant={"outline"}
					style={{
						borderColor:
							(c.eventTypes as Record<string, string>)[row.original.type] || c.eventTypes.Other,
					}}
				>
					{row.original.type}
				</Badge>
			</span>
		),
	},
	// {
	// 	accessorKey: "email",
	// 	header: "Email",
	// },
	// {
	// 	accessorKey: "profileData.hackerTag",
	// 	header: "Hacker Tag",
	// 	cell: ({ row }) => `@${row.original.profileData.hackerTag}`,
	// },
	// {
	// 	accessorKey: "clerkID",
	// 	header: "Account ID",
	// },
	// {
	// 	accessorKey: "role",
	// 	header: "Role",
	// },
	{
		accessorKey: "startTime",
		header: "Start",
		cell: ({ row }) => (
			<span suppressHydrationWarning={true}>
				{new Date(row.original.startTime).toLocaleDateString() + " "}
				{new Date(row.original.startTime).toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</span>
		),
	},
	{
		accessorKey: "endTime",
		header: "End",
		cell: ({ row }) => (
			<span suppressHydrationWarning={true}>
				{new Date(row.original.endTime).toLocaleDateString() + " "}
				{new Date(row.original.endTime).toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</span>
		),
	},
	{
		accessorKey: "Scanner",
		header: "Scanner",
		cell: ({ row }) => (
			<Link href={`/admin/scanner/${row.original.id}`}>
				<Button>Scanner</Button>
			</Link>
		),
	},
	{
		accessorKey: "View",
		header: "View",
		cell: ({ row }) => (
			<Link href={`/schedule/${row.original.id}`}>
				<Button>View</Button>
			</Link>
		),
	},
	{
		accessorKey: "Points",
		header: "Points",
		cell: ({ row }) => (
			<span>{row.original.pointsWorth}</span>
		),
	},
	{
		accessorKey: "Edit",
		header: "Edit",
		cell: ({ row }) => (
			<Link href={`/admin/events/edit/${row.original.id}`}>
				<Button>Edit</Button>
			</Link>
		),
	},
	{
		accessorKey: "Delete",
		header: "Delete",
		cell: ({ row }) => (
			<Button variant={"destructive"} onClick={async () => {
				if (confirm("Are you sure you want to delete this event?")) {
					await deleteEvent({ eventId: row.original.id });
					revalidatePath("/admin/events")
					revalidatePath("/dash/schedule")
				}
			}}>Delete</Button>
		),
	},
];
