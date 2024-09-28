import Image from "next/image"
import { Globe } from 'lucide-react'; // Add this import

type Person = {
  fname: string
  lname: string
  imgLink: string
  role: string
  linkedin: string
  website: string
  github: string
}

function createPerson(
  fname: string,
  lname: string,
  role: string,
  linkedin?: string,
  website?: string,
  github?: string
): Person {
  return {
    fname,
    lname,
    imgLink: `/img/people/${fname.toLowerCase()}.png`,
    role,
    linkedin: linkedin || '',
    website: website || '',
    github: github || '',
  }
}

const team: Person[] = [
  createPerson("Trenton", "Ward", "Co-Lead Director"),
  createPerson("Saharsh", "Goenka", "Co-Lead Director"),
  createPerson("Kartik", "Aggarwal", "Director of Finance"),
  createPerson("Yonatan", "Rosenbloom", "Director of Industry"),
  createPerson("Omkaar", "Shenoy", "Director of Hacker Experience"),
  createPerson("Dhravya", "Shah", "Director of Technology"),
  createPerson("Satya", "Neriyanuru", "Director of Design & Marketing"),
  createPerson("Keerthana", "Gontu", "Director of Operations"),
  createPerson("Christian", "Thompson", "Operations"),
  createPerson("Bhoomi", "Sahajsinghani", "Design and Marketing"),
  createPerson("Dhanush", "Kalaiselvan", "Tech"),
  createPerson("Sia", "Sheguri", "Design and Marketing"),
  createPerson("Krisha", "Raut", "Design and Marketing"),
  createPerson("Paul", "Horton", "Associate"),
  createPerson("Edmund", "Dong", "Associate"),
  createPerson("Cecilia", "La Place", "Associate"),
  createPerson("Evan", "Tung", "Associate"),
]

export function MeetTheTeam() {
  return (
    <section className={`bg-gradient-to-b from-[#FCF1CF] via-[#DFF3DF] to-[#FDF4BF] py-16`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#4B0082]">
          Meet the sunhacks team
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="relative h-40">
                <Image
                  src={member.imgLink}
                  alt={`${member.fname} ${member.lname}`}
                  // layout="fill"
                  // objectFit="cover"
                  // objectPosition="top"
                  className="object-top object-cover"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4B0082] to-transparent opacity-30"></div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-[#483D8B] mb-1">{`${member.fname} ${member.lname}`}</h3>
                <p className="text-xs text-[#6A5ACD] font-medium">{member.role}</p>
                <div className="mt-2 flex space-x-2 text-xs">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#4B0082] hover:text-[#6A5ACD]">
                      LinkedIn
                    </a>
                  )}
                  {member.website && (
                    <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-[#4B0082] hover:text-[#6A5ACD]">
                      <Globe size={16} />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-[#4B0082] hover:text-[#6A5ACD]">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
