import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";

export default function LogoutPage() {
	return (
		<main className="flex flex-col min-h-screen items-center justify-center px-2">
			<div className="fixed left-1/2 top-[calc(50%+7rem)] overflow-x-hidden h-[40vh] w-[800px] max-w-screen -translate-x-1/2 -translate-y-1/2 scale-150 bg-hackathon opacity-30 blur-[100px] will-change-transform" />
			<h1 className="text-6xl md:text-8xl pb-5 mb-10 font-extrabold text-hackathon dark:text-transparent dark:bg-gradient-to-t dark:from-hackathon/80 dark:to-white dark:bg-clip-text">
				Log Out
			</h1>
			<div className="w-full max-w-[500px] flex gap-y-4 flex-col justify-center items-center px-5 dark:bg-white/[0.08] bg-white backdrop-blur transition rounded-xl aspect-video relative z-10 ">
				<h2 className="font-black text-2xl text-center w-full">Are you sure you want to log out?</h2>
				<SignOutButton/>
			</div>
		</main>
	);
}

export const runtime = "edge";
