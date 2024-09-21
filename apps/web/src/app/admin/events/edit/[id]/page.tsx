import { db } from "db";
import { eq } from "db/drizzle";
import { events } from "db/schema";
import FullScreenMessage from "@/components/shared/FullScreenMessage";
import NewEventForm from "@/components/admin/events/NewEventForm";
import EditEventForm from "@/components/admin/events/EditEventForm";

export default async function Page({ params }: { params: { id: string } }) {
	if (!params || !params.id || isNaN(parseInt(params.id))) {
		return (
			<FullScreenMessage title={"Invalid ID"} message={"The Event ID in the URL is invalid."} />
		);
	}

	const event = await db.query.events.findFirst({
		where: eq(events.id, parseInt(params.id)),
	});

	if (!event) {
		return (
			<FullScreenMessage title={"Invalid ID"} message={"The Event ID in the URL is invalid or does not exist."} />
		);
	}
    
    return (
        <div className="">
			<h1>Edit Event</h1>
			<EditEventForm event={event} />
		</div>
	);
}

export const runtime = "edge";
