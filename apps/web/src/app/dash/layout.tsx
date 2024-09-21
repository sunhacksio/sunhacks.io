import c from "config";
import Image from "next/image";

import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import DashNavItem from "@/components/dash/shared/DashNavItem";
import { redirect } from "next/navigation";
import ProfileButton from "@/components/shared/ProfileButton";
import ClientToast from "@/components/shared/ClientToast";
import { kv } from "@vercel/kv";

interface DashLayoutProps {
	children: React.ReactNode;
}

export default async function DashLayout({ children }: DashLayoutProps) {
	const user = await currentUser();

	if (!user || !user.publicMetadata.registrationComplete) {
		return redirect("/register");
	}

	const [GuideLink, DiscordLink]: (string | null)[] =
	await kv.mget(
		"config:links:guide",
		"config:links:discord"
	);

	return (
		<>
			<ClientToast />
			<div className="w-full h-16 px-5 grid grid-cols-2 bg-nav">
				<div className="flex items-center gap-x-4">
					<Link href="/">
						<Image className="invert-0 dark:invert" src={c.icon.svg} alt={c.hackathonName + " Logo"} width={32} height={32} />
					</Link>
					<div className="bg-muted-foreground h-[45%] rotate-[25deg] w-[2px]" />
					<h2 className="font-bold tracking-tight">Dashboard</h2>
				</div>
				<div className="items-center justify-end gap-x-4 md:flex hidden">
					<Link href={"/"}>
						<Button variant={"outline"} className="bg-nav hover:bg-background">
							Home
						</Button>
					</Link>
					<Link href={GuideLink || '#'} target="_blank">
						<Button variant={"outline"} className="bg-nav hover:bg-background">
							Live Site {GuideLink === null ? ' (Coming soon!)' : ''}
						</Button>
					</Link>
					<Link href={DiscordLink || '#'} target="_blank">
						<Button variant={"outline"} className="bg-nav hover:bg-background">
							Discord {DiscordLink === null ? ' (Coming soon!)' : ''}
						</Button>
					</Link>
					<ProfileButton />
				</div>
				<div className="items-center justify-end gap-x-4 md:hidden flex"><ProfileButton /></div>
			</div>
			<div className="w-full h-12 px-5 flex bg-nav border-b-border border-b">
				{Object.entries(c.dashPaths.dash).map(([name, path]) => (
					<DashNavItem key={name} name={name} path={path} />
				))}
			</div>
			{children}
		</>
	);
}

export const runtime = "edge";
