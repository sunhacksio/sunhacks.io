import Link from 'next/link';

import Navbar from '@/components/shared/Navbar';

import MLHBadge from '@/components/landing/MLHBadge';

import Parallax from './parallax';

import FAQ from './FAQ';  // We'll create this component separately

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

import Team from '@/components/landing/Team';

import { DesertSponsorsSection } from '@/components/landing/desert-sponsors-section';
import { MeetTheTeam } from '@/components/landing/meet-the-team';
import { db, asc } from 'db';
import { events } from 'db/schema';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';


const faqItems = [
  {
    question: "What's a hackathon?",
    answer: "Although definitions and connotations may vary, at sunhacks, a hackathon means a 24-36 hour prototyping marathon. sunhacks is a 24-hour hackathon this Fall! Work on software or hardware solutions to real-world problems, innovative projects, or anything you can think of, no holds barred (within our code of conduct, of course)."
  },
  {
    question: "Who can hack?",
    answer: "Any student above the age of 18 is welcome to participate! Our event is fully in-person, so the event may be capacity-limited. Be sure to register early to secure your spot! If you've recently graduated, you can still participate within one year of your graduation date."
  },
  {
    question: "What about teams?",
    answer: "Max team size is four (4), minimum team size is one (1, meaning you!). Make sure each of your team members 1) register to attend and 2) when it comes time to submit the project all members are included in the submission. Only one project submission is allowed per participant."
  },
  {
    question: "How much does it cost?",
    answer: "Through the help of ASU and our sponsors, sunhacks will never charge any sort of participation fee for our events."
  },
  {
    question: "What are the rules?",
    answer: "As an MLH member event, all attendees must follow the MLH code of conduct."
  },
  {
    question: "I'm new to programming / I have never programmed before. Can I still participate?",
    answer: "At sunhacks, everyone of any experience level or background is welcome to participate. sunhacks is your opportunity to explore the unknowns and learn a thing or two, or to simply make some new friends and build a silly project! Our experienced and diverse mentoring team is available throughout the whole event to answer any questions you may have, to ensure you have the tools to create whatever your project may be."
  },
  {
    question: "How do I become a mentor/judge/speaker at sunhacks?",
    answer: "All are eligible to become a mentor or speaker regardless of their experience level, although a hacker cannot also judge projects. Since schedule capacity is limited, Speakers will be selected based on their experience level and topic matter. If interested, fill out our volunteer form here, and our team will reach out when the time comes!"
  },
  {
    question: "Are additional accommodations available for request?",
    answer: "Absolutely! Additional accommodations can be requested through our Registration form. Don't hesitate to reach out team@sunhacks.io if you have any additional questions or ideas for ways that we can make sunhacks more accessible."
  }
];

export default async function Home() {

  const scheduledEvents = await db.query.events.findMany({
    orderBy: asc(events.startTime),
  });

  const eventsByDay = scheduledEvents.reduce((acc: Record<string, typeof events.$inferSelect[]>, event) => {
    const mstTime = utcToZonedTime(event.startTime, 'America/Phoenix');
    const day = format(mstTime, 'EEEE, MMMM d, yyyy', { locale: enUS });
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push({
      ...event,
      startTime: mstTime,
      endTime: utcToZonedTime(event.endTime, 'America/Phoenix'),
    });
    return acc;
  }, {});


  return (
    <div className={`w-full overflow-x-hidden `}>
      {/*<Navbar />*/}
      <MLHBadge />

      <main className="min-h-screen relative">
        <section className="relative bg-yellow-200/60 overflow-hidden">
          <Parallax />
          <div
            className="flex flex-col items-center justify-center min-h-screen w-full py-12 relative z-20 -translate-y-44">
            <img
              src="/logo.png"
              alt="sunhacks logo"
              className="w-32 h-32 invert mt-16"
            />
            <h1 className="text-6xl md:text-8xl font-bold text-center">
              sunhacks
            </h1>
            <h2 className="text-2xl text-center mt-3 text-black font-extrabold">
              <div>September 28th - 29th 2024</div>
              <div className="mt-2">

                Arizona State University

              </div>
            </h2>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="flex flex-row gap-4">              <Link href="/dash">
                <button
                  className="text-lg text-white text-center mt-4 bg-black hover:bg-white hover:text-black py-2 px-4 rounded-md">
                  Go to dashboard
                </button>
              </Link>
                <Link href="https://live.sunhacks.io">
                  <button
                    className="text-lg text-white text-center mt-4 bg-black hover:bg-white hover:text-black py-2 px-4 rounded-md">
                    Live site
                  </button>
                </Link></div>
                <a
                  href="/register"
                  className="underline hover:text-gray-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                Walk-in Registration
              </a>                
            </div>
          </div>
        </section>
        <section
          className="flex flex-col bg-[#2F0007] min-h-screen z-50 items-center justify-center gap-8 px-8 md:px-0 py-8">
          <h2 className="text-white text-7xl">what is sunhacks?</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-white flex flex-col gap-4">
              <img
                className="md:w-[350px] rounded-xl"
                src="img/showcase1-w350px.jpg"
              />
            </div>
            <div className="text-amber-400 md:w-1/2 text-2xl">
              sunhacks is a yearly hackathon (ideathon, coding marathon,
              prototyping marathon, etc) designed to support students in their
              innovative journeys. sunhacks is for students of all skill levels,
              and our job as organizers is to support you by providing the
              resources you need to achieve your development dreams. We provide
              you with workshops, mentors, community connections, and peers who
              are motivated to help each other succeed and reach their goals.
            </div>
          </div>
        </section>

        <div className="relative">
          <div className="absolute top-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
              <path
                fill="#2F0007"
                fillOpacity={1}
                d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,112C1120,96,1280,96,1360,96L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              />
            </svg>
          </div>
          <section
            className="flex flex-col bg-[#D74E1D] min-h-screen z-50 items-center justify-center gap-8 px-8 md:px-0 py-8 pt-44">
            <div>
              <h2 className="text-white text-7xl">And we're back for 2024!</h2>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="text-amber-300 text-xl">
                We are incredibly excited to bring sunhacks back to the Arizona State community!
              </div>

              {/* Three cards that are slightly tilted to look cool */}
              <div className='flex flex-col md:flex-row gap-4 max-w-3xl'>
                <div
                  className='bg-[#F9EA8240] w-full rotate-2 hover:rotate-0 transition-transform duration-200 ease-in-out text-black rounded-xl p-4 flex flex-col gap-4'>
                  <div className="text-2xl">
                    fully in-person
                  </div>

                  <div>
                    For Fall 2024, sunhacks will be hosted as a fully in-person event at the Sun Devil Fitness Complex
                    (SDFC) at Arizona State University - Tempe.
                  </div>
                </div>

                <div
                  className='bg-[#2A030850] w-full -rotate-2 hover:rotate-0 transition-transform duration-200 ease-in-out text-white rounded-xl p-4 flex flex-col gap-4'>
                  <div className="text-2xl">
                    all students are welcome!
                  </div>

                  <div>
                    We are open to all skill levels, ages, background, fields, and more. As long as you're a student
                    you're in!
                  </div>
                </div>

                <div
                  className='bg-[#E9A267] w-full rotate-2 hover:rotate-0 transition-transform duration-200 ease-in-out text-black rounded-xl p-4 flex flex-col gap-4'>
                  <div className="text-2xl">
                    in-person workshops, sponsors, and swag
                  </div>

                  <div>
                    This year, we will have sponsorship present in-person, as well as swag and live activities. Our
                    workshops will be facilitated in person and live-streamed, in case you want to take a break from
                    hacking while staying engaged.
                  </div>
                </div>
              </div>
            </div>
          </section>


          <DesertSponsorsSection />

          <section className="bg-[#2F0007] py-16">
            {/* New Hardware Lab section */}
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">Hardware Lab</h2>
              <p className="text-lg text-center text-white mb-8">
                Explore our state-of-the-art hardware lab, equipped with the latest tools and technologies to bring your ideas to life!
              </p>
              {/* Add more details about the hardware lab here */}
            </div>
          </section>

{/*           <section className="bg-[#FFF4B8] py-16 dark:bg-[#2F0007]">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#2F0007] dark:text-white">Event Schedule</h2>
              {Object.entries(eventsByDay).map(([day, dayEvents]) => (
                <div key={day} className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#D74E1D] dark:text-amber-400">{day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayEvents.map((event) => (
                      <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                        <h4 className="text-xl font-semibold mb-2 text-[#2F0007] dark:text-white">{event.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {format(event.startTime, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
                        </p>
                        {event.description && (
                          <p className="text-gray-700 dark:text-gray-200 text-sm">{event.description}</p>
                        )}
                        {event.location && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            <span className="font-semibold">Location:</span> {event.location}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section> */}

          <MeetTheTeam />

          <section className="bg-[#FFF4B8] py-16 hidden">
            {/* New Prize Tracks section */}
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#2F0007]">Prize Tracks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Add prize track cards here */}
                {/* Example: */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">Creativity</h3>
                  <p>Showcase your most innovative and creative ideas!</p>
                </div>
                {/* Add more prize track cards */}
              </div>
            </div>
          </section>

          <section className="bg-[#D74E1D] py-16 hidden">
            {/* New Top Prizes section */}
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">Top Prizes</h2>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">1st Place</h3>
                  <p>Ender 3D Printers</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">2nd Place</h3>
                  <p>Samsung Monitor</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">3rd Place</h3>
                  <p>Fujimax Polaroid Camera</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#FFF4B8] z-50 py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-[#2F0007] text-6xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div className="max-w-[1440px] mx-auto">
                  <p className="text-[#2F0007] text-lg mb-8 text-center">
                    We know that things can be pretty intimidating when there's a lot of unknowns, so check out some
                    what-ifs below! If you still have questions, email us at{' '}
                    <a href="mailto:team@sunhacks.io" className="text-[#D74E1D] hover:underline">
                      team@sunhacks.io
                    </a>
                  </p>
                  <FAQ faqItems={faqItems} />
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="bg-[#2F0007] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-4 mb-4">
              <a href="https://www.facebook.com/sunhacksio/"
                className="text-white hover:text-gray-300 transition-colors duration-200">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com/sunhacksio"
                className="text-white hover:text-gray-300 transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/sunhacksio/"
                className="text-white hover:text-gray-300 transition-colors duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/sunhacksio/about/"
                className="text-white hover:text-gray-300 transition-colors duration-200">
                <FaLinkedin size={24} />
              </a>
              <a href="mailto:team@sunhacks.io"
                className="text-white hover:text-gray-300 transition-colors duration-200">
                <FaPaperPlane size={24} />
              </a>
            </div>
            <div className="text-center">
              <a href="http://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                className="text-white hover:text-gray-300 transition-colors duration-200 underline">
                MLH code of conduct
              </a>
            </div>
            <div className="text-center">
              <a href="https://github.com/acmutsa/HackKit"
                className="text-white hover:text-gray-300 transition-colors duration-200 underline">
                Powered by HackKit
              </a>
            </div>
            <div className="text-center">
              <span
                className="text-white">Made by sunhacks with love ♥</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}


export const runtime = 'edge';
export const revalidate = 30;
