// 'use client';
// import { useEffect, useState } from 'react';

// export default function RegistrantsPage() {
//   const [registrants, setRegistrants] = useState([]);

//   useEffect(() => {
//     const fetchRegistrants = async () => {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/registrants`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setRegistrants(data);
//     };

//     fetchRegistrants();
//     const interval = setInterval(fetchRegistrants, 5000); // real-time polling every 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">📋 All Registrants</h1>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Event</th>
//             <th className="p-2 border">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {registrants.map((r: any, i: number) => (
//             <tr key={i} className="border-t">
//               <td className="p-2 border">{r.name}</td>
//               <td className="p-2 border">{r.email}</td>
//               <td className="p-2 border">{r.event?.title || '—'}</td>
//               <td className="p-2 border">{new Date(r.createdAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
