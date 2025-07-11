// // // // "use client";
// // // // import { useSession, signIn } from "next-auth/react";
// // // // import { useState } from "react";
// // // // import { useRouter } from "next/navigation";

// // // // export default function CreateEvent() {
// // // //   const { data: session, status } = useSession();
// // // //   const router = useRouter();
// // // //   const [form, setForm] = useState({ title: "", description: "", date: "" });

// // // //   if (status === "loading") return <p>Loading...</p>;
// // // //   if (status === "unauthenticated") {
// // // //     signIn(); // Redirect to login
// // // //     return null;
// // // //   }

// // // //   async function handleSubmit() {
// // // //     const res = await fetch("http://localhost:4000/api/events/create", {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({ ...form 
        
// // // //       }),
// // // //     });

// // // //     const data = await res.json();
// // // //     if (data.success) {
// // // //       alert("Event created at: " + data.event.slug);
// // // //       router.push("/events/" + data.event.slug); // optional redirect
// // // //     } else {
// // // //       alert("Failed to create event");
// // // //     }
// // // //   }

// // // //   return (
// // // //     <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="space-y-4 p-8 max-w-xl mx-auto">
// // // //       <input
// // // //         placeholder="Title"
// // // //         required
// // // //         className="w-full border px-4 py-2 rounded"
// // // //         onChange={e => setForm({ ...form, title: e.target.value })}
// // // //       />
// // // //       <textarea
// // // //         placeholder="Description"
// // // //         required
// // // //         className="w-full border px-4 py-2 rounded"
// // // //         onChange={e => setForm({ ...form, description: e.target.value })}
// // // //       />
// // // //       <input
// // // //         type="date"
// // // //         required
// // // //         className="w-full border px-4 py-2 rounded"
// // // //         onChange={e => setForm({ ...form, date: e.target.value })}
// // // //       />
// // // //       <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
// // // //         Create
// // // //       </button>
// // // //     </form>
// // // //   );
// // // // }
// // // "use client";
// // // import { useSession } from "next-auth/react";
// // // import { useState } from "react";

// // // export default function CreateEvent() {
// // //   const { data: session } = useSession();
// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     description: "",
// // //     date: "",
// // //   });

// // //   const handleSubmit = async () => {
// // //     if (!session?.user?.email) {
// // //       alert("Please login to create an event.");
// // //       return;
// // //     }

// // //     const res = await fetch("http://localhost:4000/events/create", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         ...form,
// // //          userEmail: session?.user?.email, 
// // //       }),
// // //     });

// // //     const data = await res.json();
// // //     if (res.ok) {
// // //       alert("Event created at: " + data.event.slug);
// // //     } else {
// // //       alert("Error: " + data.error);
// // //     }
// // //   };

// // //   if (!session) return <p>Please login to create an event</p>;

// // //   return (
// // //     <form
// // //       onSubmit={(e) => {
// // //         e.preventDefault();
// // //         handleSubmit();
// // //       }}
// // //       style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}
// // //     >
// // //       <input
// // //         placeholder="Title"
// // //         onChange={(e) => setForm({ ...form, title: e.target.value })}
// // //         required
// // //       />
// // //       <textarea
// // //         placeholder="Description"
// // //         onChange={(e) => setForm({ ...form, description: e.target.value })}
// // //         required
// // //       />
// // //       <input
// // //         type="date"
// // //         onChange={(e) => setForm({ ...form, date: e.target.value })}
// // //         required
// // //       />
// // //       <button type="submit">Create Event</button>
// // //     </form>
// // //   );
// // // }
// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';

// // export default function CreateEventPage() {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [date, setDate] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       alert('Please login first');
// //       router.push('/login');
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/create`, {
// //         method: 'POST',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ title, description, date }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         throw new Error(data.error || 'Something went wrong');
// //       }

// //       setMessage('✅ Event created successfully!');
// //       router.push(`/events/${data.event.slug}`);
// //     } catch (err: any) {
// //       console.error(err);
// //       setMessage(`❌ ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white py-10 px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8 space-y-4 border border-gray-200"
// //       >
// //         <h1 className="text-2xl font-bold text-center text-blue-700">Create Event</h1>

// //         <input
// //           type="text"
// //           placeholder="Event Title"
// //           required
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <textarea
// //           placeholder="Event Description"
// //           required
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <input
// //           type="date"
// //           required
// //           value={date}
// //           onChange={(e) => setDate(e.target.value)}
// //           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className={`w-full py-2 rounded-md text-white font-semibold transition ${
// //             loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
// //           }`}
// //         >
// //           {loading ? 'Creating...' : 'Create Event'}
// //         </button>

// //         {message && (
// //           <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
// //         )}
// //       </form>
// //     </main>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function CreateEventPage() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [tickets, setTickets] = useState('');
//   const [participants, setParticipants] = useState('');
//   const [customFields, setCustomFields] = useState<{ name: string; value: string }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleAddField = () => {
//     setCustomFields([...customFields, { name: '', value: '' }]);
//   };

//   const handleRemoveField = (index: number) => {
//     const newFields = [...customFields];
//     newFields.splice(index, 1);
//     setCustomFields(newFields);
//   };

//   const handleCustomFieldChange = (index: number, key: 'name' | 'value', value: string) => {
//     const newFields = [...customFields];
//     newFields[index][key] = value;
//     setCustomFields(newFields);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please login first');
//       router.push('/login');
//       return;
//     }

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/create`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           date,
//           tickets,
//           participants,
//           customFields, // Optional: send this if you want to store custom fields
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || 'Something went wrong');
//       }

//       setMessage('✅ Event created successfully!');
//      router.push('/eventsall');;
//     } catch (err: any) {
//       setMessage(`❌ ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl bg-white shadow-md rounded-lg p-8 space-y-4 border"
//       >
//         <h1 className="text-2xl font-bold text-center text-blue-600">Create Event</h1>

//         <input
//           type="text"
//           placeholder="Title"
//           required
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         <textarea
//           placeholder="Description"
//           required
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           type="date"
//           required
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           type="number"
//           placeholder="Tickets (optional)"
//           value={tickets}
//           onChange={(e) => setTickets(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         {/* <input
//           type="number"
//           placeholder="Participants (optional)"
//           value={participants}
//           onChange={(e) => setParticipants(e.target.value)}
//           className="w-full p-2 border rounded"
//         /> */}

//         <input
//           type="String"
//           placeholder="Location(optional)"
//           value={participants}
//           onChange={(e) => setParticipants(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         {/* 👇 Optional dynamic custom fields */}
//         <div className="space-y-2">
//           <label className="block text-sm font-medium">Custom Fields</label>
//           {customFields.map((field, idx) => (
//             <div key={idx} className="flex gap-2 items-center">
//               <input
//                 placeholder="Field Name"
//                 value={field.name}
//                 onChange={(e) => handleCustomFieldChange(idx, 'name', e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <input
//                 placeholder="Value"
//                 value={field.value}
//                 onChange={(e) => handleCustomFieldChange(idx, 'value', e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <button type="button" onClick={() => handleRemoveField(idx)} className="text-red-500">✕</button>
//             </div>
//           ))}
//           <button type="button" onClick={handleAddField} className="text-blue-600 text-sm underline">
//             + Add Field
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 text-white rounded ${
//             loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Creating...' : 'Create Event'}
//         </button>

//         {message && <p className="text-center text-gray-600">{message}</p>}
//       </form>
//     </main>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tickets, setTickets] = useState('');
  const [participants, setParticipants] = useState('');
  const [customFields, setCustomFields] = useState<{ name: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...customFields];
    newFields.splice(index, 1);
    setCustomFields(newFields);
  };

  const handleCustomFieldChange = (index: number, key: 'name' | 'value', value: string) => {
    const newFields = [...customFields];
    newFields[index][key] = value;
    setCustomFields(newFields);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          date,
          tickets,
          participants,
          customFields,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage('✅ Event created successfully!');
      router.push('/eventsall');
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-black border border-yellow-500 rounded-2xl p-8 space-y-6 shadow-xl animate-fade-in"
      >
        <h1 className="text-3xl font-bold text-center text-yellow-400 drop-shadow-lg tracking-wide">
           Create Your Event
        </h1>

        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
        />

        <textarea
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
        />

        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 bg-black border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
        />

        <input
          type="number"
          placeholder="Tickets (optional)"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
        />

        <input
          type="text"
          placeholder="Location (optional)"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="w-full p-3 bg-black border border-white rounded-lg placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
        />

        {/* Custom Fields */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-yellow-400">Custom Fields</label>
          {customFields.map((field, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                placeholder="Field Name"
                value={field.name}
                onChange={(e) => handleCustomFieldChange(idx, 'name', e.target.value)}
                className="flex-1 p-2 bg-black border border-white rounded placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                placeholder="Value"
                value={field.value}
                onChange={(e) => handleCustomFieldChange(idx, 'value', e.target.value)}
                className="flex-1 p-2 bg-black border border-white rounded placeholder:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => handleRemoveField(idx)}
                className="text-red-500 hover:scale-110 transition"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddField}
            className="text-yellow-400 underline text-sm hover:text-yellow-300 transition"
          >
            + Add Field
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-black font-bold rounded-xl shadow-md transition transform hover:scale-105 ${
            loading
              ? 'bg-yellow-200 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-300'
          }`}
        >
          {loading ? 'Creating...' : ' Create Event'}
        </button>

        {message && (
          <p className="text-center text-sm text-yellow-300 mt-2 animate-pulse">{message}</p>
        )}
      </form>
    </main>
  );
}
