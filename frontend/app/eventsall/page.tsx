// // 'use client';

// // import { useEffect, useState } from 'react';
// // import Link from 'next/link';

// // type EventType = {
// //   id: string;
// //   title: string;
// //   slug: string; // ✅ make sure your backend returns this
// //   description: string;
// //   createdBy: {
// //     email: string;
// //   };
// // };

// // export default function EventListPage() {
// //   const [events, setEvents] = useState<EventType[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
// //         const data = await res.json();
// //         setEvents(data);
// //       } catch (error) {
// //         console.error('Failed to load events:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchEvents();
// //   }, []);

// //   if (loading) return <p className="text-center p-8">Loading events...</p>;

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-4 text-blue-700">All Events</h1>
// //       {events.length === 0 ? (
// //         <p>No events found.</p>
// //       ) : (
// //         <ul className="space-y-4">
// //           {events.map((event) => (
// //             <li key={event.id} className="border p-4 rounded shadow bg-white hover:bg-gray-50 transition">
// //               <Link href={`/`}>
// //                 <div>
// //                   <h2 className="text-xl font-semibold text-blue-600">{event.title}</h2>
// //                   <p className="text-gray-800">{event.description}</p>
// //                   <p className="text-sm text-gray-500 mt-2">Hosted by: {event.createdBy.email}</p>
// //                 </div>
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// type EventType = {
//   id: string;
//   title: string;
//   slug: string;
//   tickets:string
//   location: string
//   description: string;
//   createdBy: {
//     email: string;
//   };
// };

// export default function EventListPage() {
//   const [events, setEvents] = useState<EventType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
//         const data = await res.json();
//         setEvents(data);
//       } catch (error) {
//         console.error('Failed to load events:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) return <p className="text-center p-8 text-gray-500 text-sm">Loading events...</p>;

//   return (
//     <div className="px-6 py-10 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold text-center text-yellow-600 mb-10">Browse All Events</h1>

//       {events.length === 0 ? (
//         <p className="text-center text-gray-600">No events found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {events.map((event) => (
//             <Link key={event.id} href={`/`} className="block">
//               <div className="rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:bg-yellow-50">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
//                 <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
//                 <p className="text-gray-600 text-sm line-clamp-3"> {`number of tickets avaible: ${event.tickets}`}</p>
//                 <p className="text-gray-600 text-sm line-clamp-3">{` Loction: ${event.location}`}</p>


//                 <p className="mt-4 text-sm text-gray-500">Created by: {event.createdBy.email}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import router from 'next/router';

type EventType = {
  id: string;
  title: string;
  slug: string;
  tickets?: string;
  location?: string;
  date?: string;
  description?: string;
  createdBy: {
    email: string;
  };
};

export default function EventListPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <p className="text-center p-8 text-gray-500 text-sm">
        Loading events...
      </p>
    );

  return (
    
    <div className="px-6 py-10 max-w-5xl mx-auto min-h-screen bg-gradient-to-b from-white to-yellow-50">
        <nav className="w-full sticky top-0 z-20 bg-white shadow-md px-6 py-3 flex items-center justify-between">
  {/* Title on Left */}
  <h1 className="text-xl font-bold text-yellow-400 tracking-tight">
    Browse All Events
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

      {/* <h1 className="text-3xl font-bold text-center text-yellow-600 mb-10">
        Browse All Events
      </h1> */}

      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <Link key={event.id} href={`/`} className="block">
              <div className="rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:bg-yellow-50 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>

                {event.description && (
                  <p className="text-gray-700 text-sm line-clamp-3">{event.description}</p>
                )}

                {event.date && (
                  <p className="text-sm text-gray-600">
                    📅 <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                  </p>
                )}

                {event.tickets && (
                  <p className="text-sm text-gray-600">
                    🎟️ Tickets Available: <span className="font-medium">{event.tickets}</span>
                  </p>
                )}

                {event.location && (
                  <p className="text-sm text-gray-600">
                    📍 Location: <span className="font-medium">{event.location}</span>
                  </p>
                )}

                <p className="text-xs text-gray-500 pt-2">Created by: {event.createdBy.email}</p>

                {/* ✅ Register Button */}
        <div className="pt-3">
          <Link
            href={`/events/${event.slug}`}
            className="inline-block w-full text-center px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600 transition"
          >
            Register
          </Link>
        </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
