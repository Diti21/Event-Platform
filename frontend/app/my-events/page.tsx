// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// interface Event {
//   id: string;
//   title: string;
//   date: string;
//   slug: string;
//   description: string;
// }

// export default function MyEventsPage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     const fetchMyEvents = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/my-events`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || 'Failed to load events');
//         setEvents(data.events);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyEvents();
//   }, [router]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
//         Loading your events...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 font-medium">
//         {error}
//       </div>
//     );

//   return (
//     <>
//       {/* ✅ NAVBAR */}
//       <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//           <h1
//             onClick={() => router.push('/')}
//             className="text-xl font-bold text-yellow-500 cursor-pointer"
//           >
//             EventHub
//           </h1>
//           <div className="flex gap-3">
//             <button
//               onClick={() => router.push('/my-events')}
//               className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
//             >
//               My Events
//             </button>

//             <button
//               onClick={() => router.push('/eventsall')}
//               className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
//             >
//               All Events
//             </button>

//             <button
//               onClick={() => router.push('/create-event')}
//               className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
//             >
//               + Create
//             </button>

//             <button
//               onClick={() => {
//                 localStorage.removeItem('token');
//                 router.push('/login');
//               }}
//               className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
//             >
//               Logout
//             </button>
//             <div className="space-y-2">
//         <Link href="/admin/registrants">
//           <button className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition">
//             View All Registrants
//           </button>
//         </Link>
//       </div>
//           </div>
//         </div>
         
//       </nav>

//       {/* ✅ MAIN CONTENT */}
//       <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50 py-10 px-4">
//         <div className="max-w-3xl mx-auto">
//           {events.length === 0 ? (
//             <p className="text-center text-gray-600 text-sm">
//               You haven’t created any events yet.
//             </p>
//           ) : (
//             <div className="space-y-6">
//               {events.map((event) => (
//                 <div
//                   key={event.id}
//                   className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-5 space-y-2 hover:shadow-md transition"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h2 className="text-xl font-semibold text-yellow-500">{event.title}</h2>
//                     <p className="text-sm text-gray-500 whitespace-nowrap">
//                       {new Date(event.date).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <p className="text-gray-700 text-sm">{event.description}</p>
//                   <div className="pt-2">
//                     <button
//                       onClick={() => router.push(`/edit-event/${event.id}`)}
//                       className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-300 transition"
//                     >
//                       Edit Event
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  slug: string;
  description: string;
}

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchMyEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/my-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load events');
        setEvents(data.events);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading your events...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-medium">
        {error}
      </div>
    );

  return (
    <>
      {/* ✅ NAVBAR */}
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1
            onClick={() => router.push('/')}
            className="text-xl font-bold text-yellow-500 cursor-pointer"
          >
            EventHub
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/my-events')}
              className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
            >
              My Events
            </button>

            <button
              onClick={() => router.push('/eventsall')}
              className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
            >
              All Events
            </button>

            <button
              onClick={() => router.push('/create-event')}
              className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
            >
              + Create
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
              }}
              className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition"
            >
              Logout
            </button>

            <div className="space-y-2">
              <Link href="/admin/registrants">
                <button className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition">
                  View All Registrants
                </button>
              </Link>
             
            </div>
            <div className="space-y-2">
              <Link href="/admin/registrants/bulkemail">
                <button className="px-4 py-2 text-m font-medium rounded-lg text-black hover:bg-yellow-200 transition">
            Email Services
                </button>
              </Link>
             
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ MAIN CONTENT */}
      <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          {events.length === 0 ? (
            <p className="text-center text-gray-600 text-sm">
              You haven’t created any events yet.
            </p>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-5 space-y-2 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-yellow-500">{event.title}</h2>
                    <p className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm">{event.description}</p>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => router.push(`/edit-event/${event.id}`)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-300 transition"
                    >
                      Edit Event
                    </button>

                    {/* ✅ Register Link
                    <Link
                      href={`/events/${event.slug}`}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 border border-yellow-400 rounded-md text-sm font-medium hover:bg-yellow-200 transition"
                    >
                      Register
                    </Link> */}

                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
