import { db, eq } from "db";
import { DataTable } from "@/components/admin/events/EventDataTable";
import { columns } from "@/components/admin/events/EventColumns";
import { Button } from "@/components/shadcn/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { users } from "db/schema";
import FullScreenMessage from "@/components/shared/FullScreenMessage";


export default async function Page() {

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

  const events = await db.query.events.findMany();

  return (
    <div className="max-w-7xl mx-auto px-5 pt-44">
      <div className="w-full grid grid-cols-2 mb-5">
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Events</h2>
            <p className="text-sm text-muted-foreground">
              {events.length} Event{events.length != 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Link href="/admin/events/new">
            <Button className="flex gap-x-1">
              <PlusCircle />
              New Event
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={events} />
    </div>
  );
}
