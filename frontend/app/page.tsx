// // // 'use client';
// // // import Link from 'next/link';
// // // import { useEffect, useState } from 'react';

// // // export default function Home() {
// // //   const [fadeIn, setFadeIn] = useState(false);

// // //   useEffect(() => {
// // //     setFadeIn(true);
// // //   }, []);

// // //   return (
// // //     <main
// // //       className={`flex flex-col items-center justify-center min-h-screen p-8 space-y-8 text-center bg-white transition-opacity duration-500 ${
// // //         fadeIn ? 'opacity-100' : 'opacity-0'
// // //       }`}
// // //     >
// // //       <h1 className="text-4xl font-extrabold text-yellow-500 drop-shadow-sm">
// // //         Welcome to the Event Dashboard
// // //       </h1>
// // //       <p className="text-xl text-gray-700">Choose an action to proceed:</p>

// // //       <div className="flex flex-col sm:flex-row gap-6">
// // //         <Link
// // //           href="/register"
// // //           className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors duration-300 shadow-sm"
// // //         >
// // //           Register & Pay
// // //         </Link>
// // //         <Link
// // //           href="/send-emails"
// // //           className="bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-300 shadow-sm"
// // //         >
// // //           Send Bulk Emails
// // //         </Link>
// // //       </div>
// // //     </main>
// // //   );
// // // }
// // 'use client';
// // import Link from 'next/link';
// // import { useEffect, useState } from 'react';

// // const events = [
// //   { name: 'Tech Conference', slug: 'tech-conf' },
// //   { name: 'AI Bootcamp', slug: 'ai-bootcamp' },
// //   { name: 'Web3 Summit', slug: 'web3-summit' },
// // ];

// // export default function Home() {
// //   const [fadeIn, setFadeIn] = useState(false);

// //   useEffect(() => {
// //     setFadeIn(true);
// //   }, []);

// //   return (
// //     <main
// //       className={`flex flex-col items-center justify-center min-h-screen p-8 space-y-8 text-center bg-white transition-opacity duration-500 ${
// //         fadeIn ? 'opacity-100' : 'opacity-0'
// //       }`}
// //     >
// //       <h1 className="text-4xl font-extrabold text-yellow-500 drop-shadow-sm">
// //         Welcome to the Event Dashboard
// //       </h1>
// //       <p className="text-xl text-gray-700">Choose an event to register:</p>

// //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// //         {events.map(event => (
// //           <Link
// //             key={event.slug}
// //             href={`/events/${event.slug}/register`}
// //             className="bg-yellow-400 text-black font-semibold px-6 py-4 rounded-xl hover:bg-yellow-500 transition-colors duration-300 shadow-md"
// //           >
// //             Register for {event.name}
// //           </Link>
// //         ))}
// //       </div>

// //       <Link
// //         href="/send-emails"
// //         className="mt-8 inline-block bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors duration-300 shadow-sm"
// //       >
// //         Send Bulk Emails
// //       </Link>
// //     </main>
// //   );
// // }
// 'use client';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-white py-10 px-4 md:px-12 lg:px-20 text-gray-900 font-sans">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
//         <div className="fixed top-6 right-6 flex gap-4">
//   <button
//     onClick={() => router.push('/my-events')}
//     className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-blue-600 transition"
//   >
//     My Events
//   </button>
//   <button
//     onClick={() => router.push('/create-event')}
//     className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-yellow-500 transition"
//   >
//     + Create Event
//   </button>
//   <button
//     onClick={() => {
//       localStorage.removeItem('token');
//       router.push('/login');
//     }}
//     className="bg-red-500 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:bg-red-600 transition"
//   >
//     Logout
//   </button>
// </div>


        
//         {/* LEFT SIDEBAR */}
//         <div className="space-y-6">
//           <img
//             src="/roundtable-banner.png"
//             alt="Roundtable Bangalore"
//             className="w-full rounded-xl shadow-md"
//           />

//           <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
//             <p className="text-sm text-gray-500 font-medium">Presented by</p>
//             <div className="mt-1 flex items-center justify-between">
//               <a href="#" className="text-sm font-semibold text-gray-900 hover:underline">
//                 Designare Events
//               </a>
//               <button className="text-sm font-medium text-blue-600 hover:underline">
//                 Subscribe
//               </button>
//             </div>
//           </div>

//           <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-2">
//             <p className="text-sm text-gray-500 font-medium">Hosted by</p>
//             <div className="text-sm text-gray-800 font-medium space-y-1">
//               <p>Designare</p>
//               <p>Harvallav Kaur Brar</p>
//               <p>Vannsh Agrawal</p>
//             </div>
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="space-y-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Roundtable Bangalore</h1>
//             <p className="text-sm text-gray-600 mt-2 leading-relaxed">
//               Sunday, June 29<br />
//               10:30 AM – 3:00 PM<br />
//               <span className="text-blue-600 hover:underline">
//                 Green Theory · Bengaluru, Karnataka
//               </span>
//             </p>
//           </div>

//           {/* REGISTRATION */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
//             <div className="text-blue-700 font-medium text-sm flex items-center gap-2">
//               <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
//                 viewBox="0 0 24 24" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round"
//                   d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
//               </svg>
//               Approval Required
//             </div>
//             <p className="text-sm text-gray-700">
//               Your registration is subject to approval by the host.
//             </p>

//             <div className="border border-gray-200 bg-gray-50 p-3 rounded-md text-sm">
//               <p className="mb-1">Welcome! To join the event, please register below.</p>
//               <p className="font-medium text-gray-800">
//                 Diti Mehta <span className="text-gray-500">ditimehta40@gmail.com</span>
//               </p>
//             </div>

//             <button
//               //onClick={() => router.push('/events/roundtable-bangalore/register')}
//               onClick={() => router.push('/events/register')}
//               className="w-full py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition"
//             >
//               Request to Join
//             </button>
//           </div>

//           {/* ABOUT SECTION */}
//           <div className="space-y-5">
//             <h2 className="text-xl font-semibold text-gray-900">About Event</h2>
//             <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
//               <p><strong>Roundtable Bangalore</strong> — Bridging the Gap Between Design Dreams & Reality 🔥</p>
//               <p><strong>Date:</strong> 29th June 2025<br /><strong>Venue:</strong> Green Theory, Bangalore</p>
//               <p>
//                 In a world of glossy portfolios and curated success stories, the real stories – tough calls, creative pivots, and growing pains – rarely get told.
//               </p>
//               <p>This isn’t another networking gig. This is razor-sharp, unfiltered dialogue with the founders and creative directors behind some of India’s most respected studios.</p>

//               <h3 className="font-semibold text-base mt-4">Studios Showed</h3>
//               <p>
//                 We've invited the best minds – the co-founders of the agency whose work earned them a spot on Forbes 30 Under 30. A real-time non-curated backroom — from startup to the first pitch, first hire to burnout.
//               </p>

//               <p><strong>EDIDOK</strong><br />
//                 We’ve got Anujin Tsolmon (Founder & CEO) and Jusan Kumaravel (Founder & Creative Director) from EDIDOK...<br />
//                 From brand backbones to creative chaos and breakthrough moments.
//               </p>

//               <p><strong>Sekhani Vermas</strong><br />
//                 Sekhani Vermas, Creative Director at DVS Global and the brain behind the math life (Red).<br />
//                 His lived work tells some of the coolest moments of the year.
//               </p>

//               <h3 className="font-semibold text-base mt-4">Why You Should Be There</h3>
//               <p>
//                 Decca design is more than just looks and trends. This is where all the uncomfortable truth lives.
//               </p>

//               <p>Limited seats. The first 40 get in. Only a few seats remain.</p>

//               <h3 className="font-semibold text-base mt-4">Green Theory</h3>
//               <p>2/1, Kensington Rd, Swamy Vivekananda Road, Bengaluru</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50 text-black font-sans">
      {/* NAVBAR */}
     <nav className="w-full sticky top-0 z-20 bg-white shadow-md px-6 py-3 flex items-center justify-between">
  {/* Title on Left */}
  <h1 className="text-xl font-bold text-yellow-400 tracking-tight">
    Roundtable Bangalore
  </h1>

  {/* Buttons on Right */}
  <div className="flex gap-3">
    <button
      onClick={() => router.push('/my-events')}
      className="px-4 py-2 text-m font-medium rounded-lg  text-black hover:bg-yellow-200 transition"
    >
      My Events
    </button>

    <button
      onClick={() => router.push('/eventsall')}
      className="px-4 py-2 text-m font-medium rounded-lg  text-black hover:bg-yellow-200 transition"
    >
      All Events
    </button>
    <button
      onClick={() => router.push('/create-event')}
      className="px-4 py-2 text-m font-medium rounded-lg  text-black hover:bg-yellow-200 transition"
    >
      + Create
    </button>
    <button
      onClick={() => {
        localStorage.removeItem('token');
        router.push('/login');
      }}
      className="px-4 py-2 text-m font-medium rounded-lg  text-black hover:bg-yellow-200 transition"
    >
      Logout
    </button>
  </div>

 
</nav>


      {/* HERO SECTION */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
  <img
    src="/roundtable-banner.png"
    alt="Roundtable Bangalore"
    className="w-full h-full object-cover object-center"
  />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h1 className="text-white text-3xl md:text-5xl font-extrabold text-center px-4 leading-snug">
      Roundtable Bangalore<br />
      Bridging Design Dreams & Reality
    </h1>
  </div>
</div>

      {/* MAIN CONTENT */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        {/* Event Info */}
        <section className="text-center space-y-1">
          <h2 className="text-xl font-semibold">Event Details</h2>
          <p className="text-sm text-gray-600">
            <strong>Date:</strong> June 29, 2025 &nbsp; | &nbsp;
            <strong>Time:</strong> 10:30 AM – 3:00 PM
          </p>
          <p className="text-sm text-yellow-600 font-medium">
            📍 Green Theory, Bengaluru
          </p>
        </section>

        {/* Registration Section */}
        <section className="bg-white shadow-sm rounded-xl px-6 py-5 space-y-3">
          <div className="flex items-center gap-2 text-yellow-600 font-medium text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
            </svg>
            Approval Required
          </div>
          <p className="text-sm text-gray-700">
            Registration is subject to host approval.
          </p>

          <div className="bg-yellow-50 rounded-md px-4 py-2 text-sm">
            <p className="mb-1 text-gray-800">Welcome!</p>
            <p className="text-black font-medium">Diti Mehta <span className="text-gray-500">ditimehta40@gmail.com</span></p>
          </div>

          <button
            onClick={() => router.push('/events/register')}
            className="w-full mt-2 py-2 text-sm font-semibold bg-yellow-400 hover:bg-yellow-500 text-black rounded-md transition"
          >
            Request to Join Event
          </button>
        </section>

        {/* About Section */}
        <section className="space-y-4 text-gray-800 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold text-black">About the Event</h2>
          <p>
            <strong>Roundtable Bangalore</strong> is a unique design event spotlighting the untold stories behind India's most inspiring creative journeys.
          </p>
          <p>
            Skip the fluff — this event is all about honest conversations, creative pivots, setbacks, wins, and everything in between.
          </p>
          <p>
            🎤 Featuring: <strong>EDIDOK</strong> founders Anujin Tsolmon & Jusan Kumaravel and <strong>Sekhani Vermas</strong> from DVS Global.
          </p>
          <p>
            🚀 Expect raw insights on burnout, first hires, failed pitches, and the grit behind great design.
          </p>
          <p className="font-semibold text-yellow-700">
            Seats are limited — only the first 40 attendees will be confirmed.
          </p>
        </section>
      </div>
    </div>
  );
}















