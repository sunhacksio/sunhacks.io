import ToggleItem from "@/components/admin/toggles/ToggleItem";
import FullScreenMessage from "@/components/shared/FullScreenMessage";
import { auth } from "@clerk/nextjs";
import { db, eq } from "db";
import { users } from "db/schema";

interface ToggleLayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: ToggleLayoutProps) {
	const currentUser = await auth();

	const dbUser = await db.query.users.findFirst({
	  where: eq(users.clerkID, currentUser.userId ?? "")
	});
  
	if (!dbUser || !["super_admin", "admin"].includes(dbUser.role)) {
	  return (
		<FullScreenMessage
		  title="Access Denied"
		  message="You are not an admin. If you belive this is a mistake, please contact a administrator."
		/>
	  );
	}
	
	return (
		<div className="max-w-5xl mx-auto grid grid-cols-5 gap-x-3 pt-44">
			<div className="min-h-screen">
				<ToggleItem name="Toggles" path="/admin/toggles" />
				<ToggleItem name="Landing Page" path="/admin/toggles/landing" />
				<ToggleItem name="Tickets" path="/admin/toggles/tickets" />
				<ToggleItem name="Registration & RSVP" path="/admin/toggles/registration" />
				<ToggleItem name="User Dashboard" path="/admin/toggles/dashboard" />
			</div>
			<div className="col-span-4">{children}</div>
		</div>
	);
}
