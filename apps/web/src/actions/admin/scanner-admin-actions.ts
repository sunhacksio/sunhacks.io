"use server";

import { adminAction } from "@/lib/safe-action";
import { z } from "zod";
import { db, sql } from "db";
import { events, scans, users } from "db/schema";
import { eq, and } from "db/drizzle";
export const createScan = adminAction(
  z.object({
    eventID: z.number(),
    userID: z.string(),
    creationTime: z.date(),
    countToSet: z.number(),
    alreadyExists: z.boolean(),
  }),
  async (
    { eventID, userID, creationTime, countToSet, alreadyExists },
    { user, userId }
  ) => {
    if (alreadyExists) {
      await db
        .update(scans)
        .set({ count: countToSet, updatedAt: creationTime })
        .where(and(eq(scans.eventID, eventID), eq(scans.userID, userID)));
    } else {
      await db.insert(scans).values({
        userID: userID,
        updatedAt: creationTime,
        count: 1,
        eventID: eventID,
      });

      // Get pointsWorth from event
      const pointsWorth = await db.query.events.findFirst({
        where: eq(events.id, eventID),
      });

      // Increment user points by pointsWorth
      await db.update(users).set({ points: sql`points + ${pointsWorth?.pointsWorth ?? 0}` }).where(eq(users.clerkID, userID));
    }
    return { success: true };
  }
);

export const getScan = adminAction(
  z.object({ eventID: z.number(), userID: z.string() }),
  async ({ eventID, userID }, { user, userId: adminUserID }) => {
    const scan = await db.query.scans.findFirst({
      where: and(eq(scans.eventID, eventID), eq(scans.userID, userID)),
    });
    return scan;
  }
);

export const checkInUser = adminAction(
  z.string(),
  async (user, { userId: adminUserID }) => {
    // Check if scanner is an admin
    const isAdmin = ["admin", "super_admin", "volunteer"].includes(
      (
        await db
          .select({ role: users.role })
          .from(users)
          .where(eq(users.clerkID, adminUserID))
      )[0].role
    );
    // Set checkedIn to true
    return await db
      .update(users)
      .set({ checkedIn: true })
      .where(eq(users.clerkID, user));
  }
);
