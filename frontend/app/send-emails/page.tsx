// 'use client';
// import { useState, useEffect } from 'react';

// export default function BulkEmails() {
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [recs, setRecs] = useState('');
//   const [status, setStatus] = useState('');
//   const [sending, setSending] = useState(false);
//   const [fadeIn, setFadeIn] = useState(false);

//   const send = async () => {
//     setSending(true);
//     const recipients = recs.split(',').map(s => s.trim());
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email/bulk`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ subject, message, recipients }),
//       });
//       const data = await res.json();
//       setStatus(data.success ? '✅ Emails sent successfully!' : '❌ Failed to send emails.');
//     } catch {
//       setStatus(' Error while sending emails.');
//     } finally {
//       setSending(false);
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => setFadeIn(true), 100);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
//       <div
//         className={`bg-white shadow-2xl rounded-xl w-full max-w-2xl p-6 space-y-6 border border-gray-200 transform transition-all duration-700 ease-out ${
//           fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//         }`}
//       >
//         <h2 className="text-3xl font-bold text-center text-yellow-500">Bulk Email Sender</h2>

//         <input
//           placeholder="Email Subject"
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           onChange={e => setSubject(e.target.value)}
//         />
//         <textarea
//           placeholder="Type your Message"
//           rows={5}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           onChange={e => setMessage(e.target.value)}
//         />
//         <textarea
//           placeholder="Emails (comma separated)"
//           rows={3}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           onChange={e => setRecs(e.target.value)}
//         />
//         <button
//           onClick={send}
//           disabled={sending}
//           className={`w-full py-3 rounded-md font-semibold transition-all ${
//             sending
//               ? 'bg-yellow-300 text-gray-700 cursor-not-allowed'
//               : 'bg-yellow-400 hover:bg-yellow-500 text-black hover:scale-[1.01]'
//           }`}
//         >
//           {sending ? 'Sending...' : 'Send Emails'}
//         </button>
//         {status && <p className="text-center font-medium">{status}</p>}
//       </div>
//     </div>
//   );
// }
