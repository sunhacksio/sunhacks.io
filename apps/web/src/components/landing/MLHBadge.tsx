import Link from "next/link";
import Image from "next/image";

export default function MLHBadge() {
	return (
		<>
			<div className="w-full h-0 relative hidden dark:block">
				<Link
					id="mlh-trust-badge"
					className="max-w-[100px] min-w-[60px] absolute w-[10%] right-5 top-0 z-50"
					// style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000"
					href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=black"
					target="_blank"
				>
					<Image
						src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-black.svg"
						alt="Major League Hacking 2026 Hackathon Season"
						width={0}
						height={0}
						className="aspect-auto w-full h-auto"
						style={{width: "100%"}}
					/>
				</Link>
			</div>
			<div className="w-full h-0 relative block dark:hidden">
				<Link
					id="mlh-trust-badge"
					className="max-w-[100px] min-w-[60px] absolute w-[10%] right-5 top-0 z-50"
					// style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000"
					href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
					target="_blank"
				>
					<Image
						src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
						alt="Major League Hacking 2026 Hackathon Season"
						width={0}
						height={0}
						className="aspect-auto w-full h-auto"
						style={{width: "100%"}}
					/>
				</Link>
			</div>
		</>
	);
}
