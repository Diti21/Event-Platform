// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || 'Login failed');
//       }

//       // ✅ Save token and redirect
//       localStorage.setItem('token', data.token);
//       router.push('/create-event');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-lg p-8 space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-700">Login</h2>

//         <input
//           name="email"
//           type="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 rounded-md text-white font-semibold ${
//             loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>

//         {error && <p className="text-red-600 text-sm text-center">{error}</p>}

//         {/* 👇 Sign up link */}
//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <span
//             onClick={() => router.push('/signup')}
//             className="text-blue-600 cursor-pointer hover:underline"
//           >
//             Sign up
//           </span>
//         </p>
//       </form>
//     </main>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      router.push('/create-event');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-yellow-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-600">Login to Your Account</h2>

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            loading
              ? 'bg-yellow-300 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="text-yellow-600 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </main>
  );
}
