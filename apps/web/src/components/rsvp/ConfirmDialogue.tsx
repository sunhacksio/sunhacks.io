"use client";

import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";
import { Button } from "@/components/shadcn/ui/button";
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hook";
import { rsvpMyself, unRsvpMyself } from "@/actions/rsvp";
import { CheckCircleIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConfirmDialogue({ hasRsvped }: { hasRsvped: boolean }) {
	const [showConfetti, setShowConfetti] = useState(false);
	const { width, height } = useWindowSize();
	const { execute: executeRsvp, status: rsvpStatus } = useAction(rsvpMyself);
	const { execute: executeUnRsvp, status: unRsvpStatus } = useAction(unRsvpMyself);
	const router = useRouter();

	const handleRsvp = () => {
		executeRsvp(null);
		toast.loading("Confirming your RSVP...", { duration: 0 });
	};

	const handleUnRsvp = () => {
		executeUnRsvp(null);
		toast.loading("Updating your RSVP status...", { duration: 0 });
	};

	useEffect(() => {
		if (hasRsvped) {
			setShowConfetti(true);
		}
	}, [hasRsvped]);

	return (
		<>
			{showConfetti && (
				<Confetti
					onConfettiComplete={() => setShowConfetti(false)}
					recycle={false}
					run={showConfetti}
					numberOfPieces={200}
					width={width}
					height={height}
				/>
			)}
			<div className="w-full max-w-[500px] aspect-video relative dark:bg-white/[0.08] bg-white backdrop-blur transition rounded-xl p-5 flex flex-col items-center justify-center">
				{hasRsvped ? (
					<>
						<h1 className="flex items-center gap-x-2 font-bold text-2xl text-green-500">
							<CheckCircleIcon />
							You have RSVPed!
						</h1>
						<p className="pt-5 pb-10">We can't wait to see you at the event!</p>
						<div className="flex flex-col gap-y-4 items-center">
							<Link href={"/dash"}>
								<Button>Go To Dashboard</Button>
							</Link>
							<Button
								onClick={handleUnRsvp}
								variant="outline"
								className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
							>
								I won't be able to attend
							</Button>
						</div>
					</>
				) : (
					<>
						<p className="text-gray-400 text-sm text-center px-10 pb-5 absolute bottom-0">
							Psst. make sure you only RSVP if you are certain you can attend the event!
						</p>
						<Button
							onClick={handleRsvp}
							size={"lg"}
							className="font-bold"
						>
							Confirm RSVP
						</Button>
					</>
				)}
			</div>
		</>
	);
}
