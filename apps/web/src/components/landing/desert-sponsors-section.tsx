'use client'

import { Alata } from 'next/font/google'
import { Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const alata = Alata({ subsets: ['latin'], weight: ['400'] })

const tierSizes = {
  Star: "w-96",
  Planet: "w-72",
  Moon: "w-72",
  Comet: "w-72",
  "Special Thanks To:": "w-40 showTitle",
  // Clubs: "w-72 showTitle",
};

const partners = [
  {
    name: "Design experiences",
    logo: "design-experiences.png",
    url: "https://students.engineering.asu.edu/devils-invent",
    tier: "Planet",
  },
  {
    name: "Amazon",
    logo: "amazon.png",
    url: "https://amazon.jobs",
    tier: "Planet",
  },
  {
    name: "State Farm",
    logo: "statefarm.png",
    url: "https://www.statefarm.com/careers",
    tier: "Moon",
  },
  {
    name: "General Dynamics Mission Systems",
    logo: "gdms.png",
    url: "https://gdmissionsystems.com/careers",
    tier: "Comet",
  },
  {
    name: "Garmin",
    logo: "garmin.svg",
    url: "https://careers.garmin.com",
    tier: "Comet",
  },
  {
    name: "StandOut Stickers",
    logo: "https://static.mlh.io/brand-assets/sponsors/stand-out-stickers/stand-out-stickers-logo.svg",
    url: "http://hackp.ac/mlh-StandOutStickers-hackathons",
    tier: "Special Thanks To:"
  },

  {
    name: "Monster",
    logo: "Monster.png",
    url: "http://hackp.ac/mlh-StandOutStickers-hackathons",
    tier: "Special Thanks To:"
  },

  {
    name: "That's It",
    logo: "Thats-It.avif",
    url: "http://hackp.ac/mlh-StandOutStickers-hackathons",
    tier: "Special Thanks To:"
  },

  // {
  //   name: "Soda",
  //   logo: "https://soda.club/logo.svg",
  //   url: "http://hackp.ac/mlh-StandOutStickers-hackathons",
  //   tier: "Clubs"
  // },
];

export function DesertSponsorsSection() {
  return (
    <section className={`${alata.className} bg-[#ffe8d5] text-brown-900 py-16 relative overflow-hidden`}>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          A Huge Thanks To Our Sponsors:
        </h2>

        <div className="flex flex-col items-center justify-center">
          {Object.keys(tierSizes).map((tier) => (
            <div key={tier} className="mb-8">
              {/* if showtitle in the class, then show the title */}
              <h3 className={`text-2xl text-center font-bold mb-4 ${tierSizes[tier as keyof typeof tierSizes].includes("showTitle") ? "block" : "hidden"}`}>
                {tier}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {partners
                  .filter((sponsor) => sponsor.tier === tier)
                  .map((sponsor, index) => (
                    <Link key={index} className={`hover:scale-105`} href={sponsor.url}>
                      <Image
                        className={`${tierSizes[tier as keyof typeof tierSizes] || 'w-48'} m-5`}
                        unoptimized
                        width={20}
                        height={20}
                        alt={sponsor.name}
                        src={
                          !sponsor.logo.startsWith("http")
                            ? `/img/partner-logos/${sponsor.logo}`
                            : sponsor.logo
                        }
                      />
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle desert-themed background elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-yellow-100 rounded-tl-full rounded-tr-full opacity-50"></div>
      <div className="absolute top-10 left-10 w-16 h-16 bg-orange-200 rounded-full opacity-30"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-40"></div>
    </section>
  )
}