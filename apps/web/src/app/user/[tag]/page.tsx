import { db } from "db";
import { users } from "db/schema";
import { eq } from "db/drizzle";
import { notFound } from "next/navigation";
import Image from "next/image";
import RoleBadge from "@/components/dash/shared/RoleBadge";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";
import { Github, Linkedin, Globe } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

export default async function ({ params }: { params: { tag: string } }) {
	if (!params.tag || params.tag.length <= 1) return notFound();

	const user = await db.query.users.findFirst({
		where: eq(users.hackerTag, params.tag),
		with: { profileData: true, registrationData: true },
	});

	if (!user) return notFound();

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-nav px-4 py-8 md:py-16">
				<div className="max-w-4xl mx-auto">
					<div className="bg-background rounded-lg shadow-lg overflow-hidden">
						<div className="p-6 md:p-8">
							<div className="flex flex-col md:flex-row gap-8">
								<div className="flex flex-col items-center md:items-start md:w-1/3">
									<div className="w-48 h-48 rounded-full overflow-hidden relative mb-4">
										<Image
											fill
											src={user.profileData.profilePhoto}
											alt={`@${user.hackerTag}'s Profile Photo`}
											className="object-cover"
										/>
									</div>
									<h1 className="font-bold text-2xl text-center md:text-left">
										{user.firstName} {user.lastName}
									</h1>
									<div className="flex flex-wrap gap-2 items-center mt-2 justify-center md:justify-start">
										<h2 className="text-muted-foreground text-lg font-mono">@{user.hackerTag}</h2>
										<RoleBadge role={user.role} />
									</div>
									<div className="mt-6 flex flex-col gap-3 w-full">
										{user.registrationData.GitHub && (
											<SocialLink
												href={`https://github.com/${user.registrationData.GitHub}`}
												icon={<Github className="w-5 h-5" />}
												label={user.registrationData.GitHub}
											/>
										)}
										{user.registrationData.LinkedIn && (
											<SocialLink
												href={`https://linkedin.com/in/${user.registrationData.LinkedIn}`}
												icon={<Linkedin className="w-5 h-5" />}
												label={user.registrationData.LinkedIn}
											/>
										)}
										{user.registrationData.PersonalWebsite && (
											<SocialLink
												href={formatWebsiteUrl(user.registrationData.PersonalWebsite)}
												icon={<Globe className="w-5 h-5" />}
												label={formatWebsiteLabel(user.registrationData.PersonalWebsite)}
											/>
										)}
									</div>
								</div>
								<div className="md:w-2/3">
									<h3 className="font-bold text-xl mb-2">About</h3>
									<p className="text-muted-foreground">
										<Balancer>{user.profileData.bio}</Balancer>
									</p>
									{user.profileData.skills && (user.profileData.skills as string[]).length > 0 && (
										<>
											<h3 className="font-bold text-xl mt-6 mb-2">Skills</h3>
											<div className="flex flex-wrap gap-2">
												{(user.profileData.skills as string[]).map((skill) => (
													<span key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
														{skill}
													</span>
												))}
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
	return (
		<Link
			href={href}
			className="flex items-center gap-x-2 text-muted-foreground hover:text-primary transition-colors"
		>
			{icon}
			<span className="text-sm">{label}</span>
		</Link>
	);
}

function formatWebsiteUrl(url: string): string {
	return url.startsWith("http") ? url : `https://${url}`;
}

function formatWebsiteLabel(url: string): string {
	return url.replace(/^https?:\/\//, "");
}

export const runtime = "edge";
