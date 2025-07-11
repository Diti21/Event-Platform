// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';

// export default function EditEventPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { id } = params;

//   const [eventData, setEventData] = useState({
//     title: '',
//     description: '',
//     date: '',
//     location: '',
//     tickets: '',
//   });

//   const [loading, setLoading] = useState(true);

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   useEffect(() => {
//     if (!id || !token) return;

//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error('Failed to fetch event');

//         const data = await res.json();
//         setEventData({
//           title: data.title,
//           description: data.description,
//           date: data.date?.slice(0, 10),
//           location: data.location || '',
//           tickets: data.tickets?.toString() || '',
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error('Error loading event:', err);
//         alert('Failed to load event. Please try again.');
//         router.push('/my-events');
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setEventData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...eventData,
//           tickets: eventData.tickets ? Number(eventData.tickets) : null,
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Failed to update event');
//       }

//       alert('✅ Event updated successfully');
//       router.push('/my-events');
//     } catch (err: any) {
//       console.error(err);
//       alert(`❌ ${err.message}`);
//     }
//   };

//   if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="title"
//           value={eventData.title}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Event Title"
//           required
//         />
//         <textarea
//           name="description"
//           value={eventData.description}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Description"
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={eventData.date}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           name="location"
//           value={eventData.location}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Location"
//         />
//         <input
//           type="number"
//           name="tickets"
//           value={eventData.tickets}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           placeholder="Tickets (optional)"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    tickets: '',
  });

  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!id || !token) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch event');

        const data = await res.json();
        setEventData({
          title: data.title,
          description: data.description,
          date: data.date?.slice(0, 10),
          location: data.location || '',
          tickets: data.tickets?.toString() || '',
        });
        setLoading(false);
      } catch (err) {
        console.error('Error loading event:', err);
        alert('Failed to load event. Please try again.');
        router.push('/my-events');
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...eventData,
          tickets: eventData.tickets ? Number(eventData.tickets) : null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update event');
      }

      alert('✅ Event updated successfully');
      router.push('/my-events');
    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-300 text-lg animate-pulse">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-black border border-yellow-500 rounded-2xl p-8 space-y-6 shadow-xl animate-fade-in"
      >
        <h1 className="text-3xl font-bold text-center text-yellow-400 drop-shadow-lg tracking-wide">
           Edit Event
        </h1>

        <input
          name="title"
          value={eventData.title}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          placeholder="Event Title"
          required
        />

        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          placeholder="Description"
          required
        />

        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          required
        />

        <input
          name="location"
          value={eventData.location}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          placeholder="Location"
        />

        <input
          type="number"
          name="tickets"
          value={eventData.tickets}
          onChange={handleChange}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          placeholder="Tickets (optional)"
        />

        <button
          type="submit"
          className="w-full py-3 text-black font-bold rounded-xl shadow-md transition transform hover:scale-105 bg-yellow-400 hover:bg-yellow-300"
        >
           Save Changes
        </button>
      </form>
    </main>
  );
}
