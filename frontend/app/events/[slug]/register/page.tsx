// // // // // 'use client';
// // // // // import { useState } from 'react';

// // // // // export default function Register() {
// // // // //   const [form, setForm] = useState({ name: '', email: '', amount: 100 });
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const onSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify(form),
// // // // //       });

// // // // //       const data = await res.json();
// // // // //       const { orderId, key } = data;

// // // // //       if (!key || !orderId) {
// // // // //         alert("Failed to generate Razorpay order. Please try again.");
// // // // //         return;
// // // // //       }

// // // // //       if (!(window as any).Razorpay) {
// // // // //         alert('Razorpay SDK failed to load. Please refresh the page and try again.');
// // // // //         return;
// // // // //       }

// // // // //       const options = {
// // // // //         key,
// // // // //         amount: form.amount * 100,
// // // // //         currency: 'INR',
// // // // //         name: 'Event Payment',
// // // // //         description: 'Register for event',
// // // // //         order_id: orderId,
// // // // //         handler: async (response: any) => {
// // // // //           await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
// // // // //             method: 'POST',
// // // // //             headers: { 'Content-Type': 'application/json' },
// // // // //             body: JSON.stringify({ ...response, email: form.email }),
// // // // //           });
// // // // //           alert(' Payment Successful!');
// // // // //         },
// // // // //         prefill: {
// // // // //           name: form.name,
// // // // //           email: form.email,
// // // // //         },
// // // // //         theme: {
// // // // //           color: '#facc15', // yellow
// // // // //         },
// // // // //       };

// // // // //       const razorpay = new (window as any).Razorpay(options);
// // // // //       razorpay.open();
// // // // //     } catch (err) {
// // // // //       alert(' Payment failed. Please try again.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-white flex items-center justify-center px-4 transition-all duration-500">
// // // // //       <form
// // // // //         onSubmit={onSubmit}
// // // // //         className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6 border border-gray-200 animate-fade-in"
// // // // //       >
// // // // //         <h2 className="text-3xl font-bold text-center text-black">Event Payment</h2>
// // // // //         <input
// // // // //           required
// // // // //           placeholder="Full Name"
// // // // //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
// // // // //           onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
// // // // //         />
// // // // //         <input
// // // // //           required
// // // // //           type="email"
// // // // //           placeholder="Email Address"
// // // // //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
// // // // //           onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
// // // // //         />
// // // // //         <button
// // // // //           type="submit"
// // // // //           disabled={loading}
// // // // //           className={`w-full py-2 rounded-md font-medium transition-all duration-300 ${
// // // // //             loading
// // // // //               ? 'bg-yellow-300 text-black cursor-not-allowed'
// // // // //               : 'bg-yellow-400 hover:bg-yellow-500 text-black'
// // // // //           }`}
// // // // //         >
// // // // //           {loading ? 'Processing...' : `Pay ₹${form.amount}`}
// // // // //         </button>
// // // // //       </form>

// // // // //       {/* Animation CSS */}
// // // // //       <style jsx>{`
// // // // //         .animate-fade-in {
// // // // //           animation: fadeIn 0.6s ease-out;
// // // // //         }
// // // // //         @keyframes fadeIn {
// // // // //           0% {
// // // // //             opacity: 0;
// // // // //             transform: translateY(20px);
// // // // //           }
// // // // //           100% {
// // // // //             opacity: 1;
// // // // //             transform: translateY(0);
// // // // //           }
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useParams } from 'next/navigation';
// // // // import { useState } from 'react';

// // // // export default function RegisterPage() {
// // // //   const { slug } = useParams() as { slug: string };
// // // //   const [form, setForm] = useState({ name: '', email: '', amount: 100 });
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [message, setMessage] = useState('');

// // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     setForm({ ...form, [e.target.name]: e.target.value });
// // // //   };

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     setMessage('');

// // // //     try {
// // // //       // Step 1: Create Razorpay order
// // // //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ ...form, eventSlug: slug }),
// // // //       });

// // // //       if (!res.ok) {
// // // //         const err = await res.json();
// // // //         throw new Error(err.error || 'Failed to create order');
// // // //       }

// // // //       const { orderId, key } = await res.json();

// // // //       if (!(window as any).Razorpay) {
// // // //         throw new Error('Razorpay SDK not loaded');
// // // //       }

// // // //       const razorpay = new (window as any).Razorpay({
// // // //         key,
// // // //         amount: form.amount * 100,
// // // //         currency: 'INR',
// // // //         name: 'Event Registration',
// // // //         description: `Payment for ${slug}`,
// // // //         order_id: orderId,
// // // //         handler: async function (response: any) {
// // // //           try {
// // // //             const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
// // // //               method: 'POST',
// // // //               headers: { 'Content-Type': 'application/json' },
// // // //               body: JSON.stringify({
// // // //                 ...response,
// // // //                 email: form.email,
// // // //               }),
// // // //             });

// // // //             const verifyData = await verifyRes.json();
// // // //             if (verifyData.success) {
// // // //               setMessage('✅ Payment successful! Confirmation email sent.');
// // // //             } else {
// // // //               setMessage('❌ Payment verification failed.');
// // // //             }
// // // //           } catch (err) {
// // // //             setMessage('❌ Error verifying payment.');
// // // //           }
// // // //         },
// // // //         prefill: {
// // // //           name: form.name,
// // // //           email: form.email,
// // // //         },
// // // //         theme: {
// // // //           color: '#f59e0b',
// // // //         },
// // // //       });

// // // //       razorpay.open();
// // // //     } catch (error: any) {
// // // //       console.error(error);
// // // //       setMessage(`❌ ${error.message}`);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-white space-y-4">
// // // //       <h1 className="text-2xl font-bold text-gray-800">Register for {slug}</h1>

// // // //       <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
// // // //         <input
// // // //           type="text"
// // // //           name="name"
// // // //           placeholder="Your Name"
// // // //           value={form.name}
// // // //           onChange={handleChange}
// // // //           required
// // // //           className="w-full border px-4 py-2 rounded"
// // // //         />
// // // //         <input
// // // //           type="email"
// // // //           name="email"
// // // //           placeholder="Your Email"
// // // //           value={form.email}
// // // //           onChange={handleChange}
// // // //           required
// // // //           className="w-full border px-4 py-2 rounded"
// // // //         />
// // // //         <button
// // // //           type="submit"
// // // //           disabled={loading}
// // // //           className="w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600 transition"
// // // //         >
// // // //           {loading ? 'Processing...' : `Pay ₹${form.amount}`}
// // // //         </button>
// // // //       </form>

// // // //       {message && (
// // // //         <div className="text-center text-sm text-gray-700 mt-4">{message}</div>
// // // //       )}
// // // //     </main>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useParams } from 'next/navigation';
// // // import { useState } from 'react';

// // // export default function RegisterPage() {
// // //   const { slug } = useParams() as { slug: string };
// // //   const [form, setForm] = useState({ name: '', email: '', amount: 100 });
// // //   const [loading, setLoading] = useState(false);
// // //   const [message, setMessage] = useState('');

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage('');

// // //     try {
// // //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ ...form, eventSlug: slug }),
// // //       });

// // //       if (!res.ok) {
// // //         const err = await res.json();
// // //         throw new Error(err.error || 'Failed to create order');
// // //       }

// // //       const { orderId, key } = await res.json();

// // //       if (!(window as any).Razorpay) {
// // //         throw new Error('Razorpay SDK not loaded');
// // //       }

// // //       const razorpay = new (window as any).Razorpay({
// // //         key,
// // //         amount: form.amount * 100,
// // //         currency: 'INR',
// // //         name: 'Event Registration',
// // //         description: `Payment for ${slug}`,
// // //         order_id: orderId,
// // //         handler: async function (response: any) {
// // //           try {
// // //             const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
// // //               method: 'POST',
// // //               headers: { 'Content-Type': 'application/json' },
// // //               body: JSON.stringify({
// // //                 ...response,
// // //                 email: form.email,
// // //               }),
// // //             });

// // //             const verifyData = await verifyRes.json();
// // //             if (verifyData.success) {
// // //               setMessage('✅ Payment successful! Confirmation email sent.');
// // //             } else {
// // //               setMessage('❌ Payment verification failed.');
// // //             }
// // //           } catch (err) {
// // //             setMessage('❌ Error verifying payment.');
// // //           }
// // //         },
// // //         prefill: {
// // //           name: form.name,
// // //           email: form.email,
// // //         },
// // //         theme: {
// // //           color: '#3b82f6', // Tailwind's blue-500
// // //         },
// // //       });

// // //       razorpay.open();
// // //     } catch (error: any) {
// // //       console.error(error);
// // //       setMessage(`❌ ${error.message}`);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-10 flex flex-col items-center">
// // //       <div className="max-w-3xl w-full mb-10 space-y-5 text-gray-800 animate-fade-in">
// // //         <h1 className="text-3xl font-extrabold text-center text-blue-600">🎉 Design Fusion Season 2 🎉</h1>
// // //         <p className="text-center font-medium text-lg">The Ultimate Design Showdown</p>
// // //         <p className="text-center">🗓 30th June – 15th July | 💰 Prize Pool: ₹1,50,000</p>
// // //         <p className="text-justify">
// // //           Welcome to Design Fusion Season 2—the world’s biggest designathon 🌍! Whether you're into UI/UX or branding,
// // //           this is your chance to create something epic and show off your skills! 💡 Real-world challenges, real-time feedback, and crazy prizes await 🚀.
// // //         </p>
// // //         <ul className="list-disc list-inside space-y-1">
// // //           <li>🎯 Register solo or in a team of 2–6.</li>
// // //           <li>🔑 Tackle 3 real-world problems in UI/UX and Branding.</li>
// // //           <li>💬 Get mentorship and feedback from industry legends.</li>
// // //           <li>🚨 Teams must do BOTH UI/UX and Branding.</li>
// // //         </ul>
// // //         <div className="space-y-2 text-sm">
// // //           <p className="font-semibold">📅 Timeline:</p>
// // //           <ul className="list-disc list-inside ml-2">
// // //             <li>30 Jun – 2 Jul: Training</li>
// // //             <li>2 Jul: Problem statements out</li>
// // //             <li>5 Jul: Round 1 ends</li>
// // //             <li>6–7 Jul: Judging</li>
// // //             <li>8 Jul: Round 2 starts + results</li>
// // //             <li>10 Jul: Round 2 ends</li>
// // //             <li>12 Jul: Top 30 announced</li>
// // //             <li>13 Jul: Jury pitch</li>
// // //             <li>15 Jul: Final results</li>
// // //           </ul>
// // //           <p className="font-semibold">🏆 Prizes:</p>
// // //           <ul className="list-disc list-inside ml-2">
// // //             <li>🥇 ₹75,000</li>
// // //             <li>🥈 ₹50,000</li>
// // //             <li>🥉 ₹25,000</li>
// // //             <li>💎 Special recognition + mentorship!</li>
// // //           </ul>
// // //         </div>
// // //         <p className="text-red-600 font-medium text-sm">* Event fees are non-refundable.</p>
// // //       </div>

// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className="w-full max-w-lg bg-white bg-opacity-80 border border-blue-100 backdrop-blur-lg shadow-md rounded-xl px-6 py-8 space-y-4 transition-all duration-300 animate-fade-in"
// // //       >
// // //         <h2 className="text-xl font-semibold text-center text-blue-700">Register for {slug}</h2>

// // //         <input
// // //           type="text"
// // //           name="name"
// // //           placeholder="Full Name"
// // //           value={form.name}
// // //           onChange={handleChange}
// // //           required
// // //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
// // //         />
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           placeholder="Email Address"
// // //           value={form.email}
// // //           onChange={handleChange}
// // //           required
// // //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
// // //         />

// // //         <button
// // //           type="submit"
// // //           disabled={loading}
// // //           className={`w-full py-2 rounded-md font-semibold transition-all duration-300 ${
// // //             loading
// // //               ? 'bg-blue-300 text-white cursor-not-allowed'
// // //               : 'bg-blue-500 hover:bg-blue-600 text-white'
// // //           }`}
// // //         >
// // //           {loading ? 'Processing...' : `Pay ₹${form.amount}`}
// // //         </button>
// // //       </form>

// // //       {message && (
// // //         <div className="text-center text-sm text-gray-700 mt-4">{message}</div>
// // //       )}

// // //       <style jsx>{`
// // //         .animate-fade-in {
// // //           animation: fadeIn 0.6s ease-out;
// // //         }
// // //         @keyframes fadeIn {
// // //           0% {
// // //             opacity: 0;
// // //             transform: translateY(20px);
// // //           }
// // //           100% {
// // //             opacity: 1;
// // //             transform: translateY(0);
// // //           }
// // //         }
// // //       `}</style>
// // //     </main>
// // //   );
// // // }
// // 'use client';

// // import { useParams } from 'next/navigation';
// // import { useEffect, useState } from 'react';

// // export default function RegisterPage() {
// //   const { slug } = useParams() as { slug: string };
// //   const [form, setForm] = useState({ name: '', email: '', amount: 100 });
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');

// //   useEffect(() => {
// //     const savedData = localStorage.getItem('registrationData');
// //     if (savedData) {
// //       const parsed = JSON.parse(savedData);
// //       setForm({
// //         name: parsed.teamName || 'Solo',
// //         email: parsed.linkedin || '',
// //         amount: 100,
// //       });
// //     }
// //   }, []);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage('');

// //     try {
// //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ ...form, eventSlug: slug }),
// //       });

// //       if (!res.ok) {
// //         const err = await res.json();
// //         throw new Error(err.error || 'Failed to create order');
// //       }

// //       const { orderId, key } = await res.json();

// //       const razorpay = new (window as any).Razorpay({
// //         key,
// //         amount: form.amount * 100,
// //         currency: 'INR',
// //         name: 'Event Registration',
// //         description: `Payment for ${slug}`,
// //         order_id: orderId,
// //         handler: async function (response: any) {
// //           try {
// //             const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
// //               method: 'POST',
// //               headers: { 'Content-Type': 'application/json' },
// //               body: JSON.stringify({ ...response, email: form.email }),
// //             });

// //             const verifyData = await verifyRes.json();
// //             if (verifyData.success) {
// //               setMessage('✅ Payment successful! Confirmation email sent.');
// //             } else {
// //               setMessage('❌ Payment verification failed.');
// //             }
// //           } catch {
// //             setMessage('❌ Error verifying payment.');
// //           }
// //         },
// //         prefill: {
// //           name: form.name,
// //           email: form.email,
// //         },
// //         theme: {
// //           color: '#3b82f6',
// //         },
// //       });

// //       razorpay.open();
// //     } catch (error: any) {
// //       console.error(error);
// //       setMessage(`❌ ${error.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50">
// //       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow space-y-4">
// //         <h2 className="text-xl font-semibold text-center">Pay ₹{form.amount} to complete your registration</h2>

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className={`w-full py-2 rounded-md font-semibold transition-all duration-300 ${
// //             loading ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
// //           }`}
// //         >
// //           {loading ? 'Processing...' : 'Proceed to Pay'}
// //         </button>
// //       </form>

// //       {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
// //     </main>
// //   );
// // }
// 'use client';

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function RegisterPage() {
//   const { slug } = useParams() as { slug: string };
//   const [form, setForm] = useState({ name: '', email: '', amount: 100 });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const savedData = localStorage.getItem('registrationData');
//     if (savedData) {
//       const parsed = JSON.parse(savedData);
//       setForm({
//         name: parsed.teamName?.trim() || 'Solo',
//         email: parsed.linkedin?.trim() || '',
//         amount: 100,
//       });
//     }
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, eventSlug: slug }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || 'Failed to create order');
//       }

//       const { orderId, key } = await res.json();

//       const razorpay = new (window as any).Razorpay({
//         key,
//         amount: form.amount * 100,
//         currency: 'INR',
//         name: 'Event Registration',
//         description: `Payment for ${slug}`,
//         order_id: orderId,
//         handler: async function (response: any) {
//           try {
//             const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ ...response, email: form.email }),
//             });

//             const verifyData = await verifyRes.json();
//             if (verifyData.success) {
//               setMessage('Payment successful. A confirmation email has been sent.');
//             } else {
//               setMessage('Payment verification failed.');
//             }
//           } catch {
//             setMessage('Error verifying payment.');
//           }
//         },
//         prefill: {
//           name: form.name,
//           email: form.email,
//         },
//         theme: {
//           color: '#facc15', // yellow-400
//         },
//       });

//       razorpay.open();
//     } catch (error: any) {
//       console.error(error);
//       setMessage(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-yellow-100 px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg bg-white border border-yellow-300 shadow-xl rounded-xl p-8 space-y-6"
//       >
//         <h2 className="text-xl font-bold text-center text-black">
//           Pay ₹{form.amount} to complete your registration
//         </h2>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 rounded-md font-semibold transition duration-300 ${
//             loading
//               ? 'bg-yellow-300 text-black cursor-not-allowed'
//               : 'bg-yellow-400 hover:bg-yellow-500 text-black'
//           }`}
//         >
//           {loading ? 'Processing...' : 'Proceed to Pay'}
//         </button>
//       </form>

//       {message && (
//         <p className="mt-4 text-sm text-center text-black font-medium">{message}</p>
//       )}
//     </main>
//   );
// }
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  const { slug } = useParams() as { slug: string };
  const [form, setForm] = useState({ name: '', email: '', amount: 100 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('registrationData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setForm({
        name: parsed.teamName?.trim() || 'Solo',
        email: parsed.linkedin?.trim() || '',
        amount: 100,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, eventSlug: slug }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create order');
      }

      const { orderId, key } = await res.json();

      const razorpay = new (window as any).Razorpay({
        key,
        amount: form.amount * 100,
        currency: 'INR',
        name: 'Event Registration',
        description: `Payment for ${slug}`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, email: form.email , eventSlug: slug, }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setMessage('✅ Payment successful! Redirecting...');
              setTimeout(() => {
                window.location.href = '/'; // ✅ Redirect to home page
              }, 2000);
            } else {
              setMessage('❌ Payment verification failed.');
            }
          } catch {
            setMessage('❌ Error verifying payment.');
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: {
          color: '#facc15', // yellow-400
        },
      });

      razorpay.open();
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-yellow-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white border border-yellow-300 shadow-xl rounded-xl p-8 space-y-6"
      >
        <h2 className="text-xl font-bold text-center text-black">
          Pay ₹{form.amount} to complete your registration
        </h2>

        <button
          type="submit"
          
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold transition duration-300 ${
            loading
              ? 'bg-yellow-300 text-black cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500 text-black'
          }`}
        >
          {loading ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-black font-medium">{message}</p>
      )}
    </main>
  );
}
