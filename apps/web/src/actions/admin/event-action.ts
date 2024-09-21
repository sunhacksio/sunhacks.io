"use server";

import { adminAction } from "@/lib/safe-action";
import { z } from "zod";
import { db } from "db";
import { events } from "db/schema";
import { eq } from "db/drizzle";

export const deleteEvent = adminAction(
  z.object({
    eventId: z.number(),
  }),
  async ({ eventId }, { user }) => {
    if (user.role !== "admin" && user.role !== "super_admin") {
      throw new Error("Unauthorized: Only admins and super admins can delete events");
    }

    await db.delete(events).where(eq(events.id, eventId));
    return { success: true };
  }
);

export const editEvent = adminAction(
  z.object({
    eventId: z.number(),
    name: z.string().optional(),
    description: z.string().optional(),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
    location: z.string().optional(),
    pointsWorth: z.number().optional(),
  }),
  async ({ eventId, ...updateData }, { user }) => {
    if (user.role !== "admin" && user.role !== "super_admin") {
      throw new Error("Unauthorized: Only admins and super admins can edit events");
    }

    await db.update(events)
      .set(updateData)
      .where(eq(events.id, eventId));
    return { success: true };
  }
);
