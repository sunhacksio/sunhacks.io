"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { z } from "zod";
import { db } from "db";
import { eq } from "db/drizzle";
import { users } from "db/schema";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const rsvpMyself = authenticatedAction(z.any(), async (_, { userId }) => {
	const user = await db.query.users.findFirst({ where: eq(users.clerkID, userId) });
	if (!user) throw new Error("User not found");
	await db.update(users).set({ rsvp: true }).where(eq(users.clerkID, userId));
	return { success: true };
});

export const adminCheckIn = async (clerkID: string) => {

	// check if the authenticated user is an admin
	const { userId: currentUserID } = await auth();
	if (!currentUserID) throw new Error("Unauthorized");
	const currentUser = await db.query.users.findFirst({ where: eq(users.clerkID, currentUserID) });

	console.log(currentUser);

	if (!currentUser || !['admin', 'super_admin', 'mlh'].includes(currentUser.role)) throw new Error("Unauthorized");

	const user = await db.query.users.findFirst({ where: eq(users.clerkID, clerkID) });
	if (!user) throw new Error("User not found");
	await db.update(users).set({ checkedIn: !user.checkedIn }).where(eq(users.clerkID, clerkID));
	await revalidatePath("/admin/users")
	return { success: true };
};
