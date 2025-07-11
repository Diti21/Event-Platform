// // 'use client';

// // import { useRouter, useParams } from 'next/navigation';
// // import { useState } from 'react';

// // export default function RegisterForm() {
// //   const router = useRouter();
// //   const { slug } = useParams();

// //   // States to capture form input (optional, if you want to use values later)
// //   const [phone, setPhone] = useState('');
// //   const [location, setLocation] = useState('');
// //   const [designTypes, setDesignTypes] = useState<string[]>([]);
// //   const [linkedin, setLinkedin] = useState('');
// //   const [team, setTeam] = useState('');
// //   const [teamName, setTeamName] = useState('');
// //   const [teamSize, setTeamSize] = useState('');
// //   const [checked1, setChecked1] = useState(false);
// //   const [checked2, setChecked2] = useState(false);
// //   const [checked3, setChecked3] = useState(false);
// //   const [referredBy, setReferredBy] = useState('');

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // Optional: validate/check all fields here

// //     // Redirect to payment page
// //     router.push(`/events/roundtable-bangalore/register`);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-100 py-10 px-6">
// //       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 space-y-4">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Info</h2>

// //         <div>
// //           <label className="block mb-1 font-medium">Phone Number *</label>
// //           <input
// //             type="tel"
// //             required
// //             value={phone}
// //             onChange={(e) => setPhone(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //             placeholder="+91 8974 5623 14"
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Where are you from? (city , state) *</label>
// //           <input
// //             type="text"
// //             required
// //             value={location}
// //             onChange={(e) => setLocation(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //             placeholder="Mumbai, Maharashtra"
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">What type of designing do you do? (super important) *</label>
// //           <select
// //             multiple
// //             required
// //             value={designTypes}
// //             onChange={(e) =>
// //               setDesignTypes(Array.from(e.target.selectedOptions, (option) => option.value))
// //             }
// //             className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //           >
// //             <option disabled value="">
// //               Select one or more
// //             </option>
// //             <option value="UI/UX">UI/UX</option>
// //             <option value="Graphic">Graphic</option>
// //             <option value="Product">Product</option>
// //           </select>
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Your Linkedin profile (Drop the link) *</label>
// //           <input
// //             type="url"
// //             required
// //             value={linkedin}
// //             onChange={(e) => setLinkedin(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //             placeholder="https://linkedin.com/in/yourname"
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Do you have a team? *</label>
// //           <select
// //             required
// //             value={team}
// //             onChange={(e) => setTeam(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //           >
// //             <option disabled value="">Do you have a team?</option>
// //             <option value="Yes">Yes</option>
// //             <option value="No">No</option>
// //           </select>
// //         </div>

// //         {team === 'Yes' && (
// //           <>
// //             <div>
// //               <label className="block mb-1 font-medium">If yes, what's your team name?</label>
// //               <input
// //                 type="text"
// //                 value={teamName}
// //                 onChange={(e) => setTeamName(e.target.value)}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //               />
// //             </div>

// //             <div>
// //               <label className="block mb-1 font-medium">What’s your team size? (2-6)</label>
// //               <input
// //                 type="number"
// //                 value={teamSize}
// //                 onChange={(e) => setTeamSize(e.target.value)}
// //                 min={2}
// //                 max={6}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //               />
// //             </div>
// //           </>
// //         )}

// //         <div className="space-y-2">
// //           <label className="flex items-center space-x-2">
// //             <input type="checkbox" checked={checked1} onChange={() => setChecked1(!checked1)} required />
// //             <span>You have read all the Necessary things before submitting the form *</span>
// //           </label>

// //           <label className="flex items-center space-x-2">
// //             <input type="checkbox" checked={checked2} onChange={() => setChecked2(!checked2)} required />
// //             <span>YOU HAVE COMPLETED YOUR PAYMENT AND HAVE SENT/WILL SEND THE SCREENSHOT *</span>
// //           </label>

// //           <label className="flex items-center space-x-2">
// //             <input type="checkbox" checked={checked3} onChange={() => setChecked3(!checked3)} />
// //             <span>OUTSIDE INDIA REGISTRATION</span>
// //           </label>
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Referred by someone? Add their name</label>
// //           <input
// //             type="text"
// //             value={referredBy}
// //             onChange={(e) => setReferredBy(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-md"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
// //         >
// //           Proceed to Pay
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import { useState } from 'react';

// export default function RegisterForm() {
//   const router = useRouter();
//   const { slug } = useParams();

//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');
//   const [designTypes, setDesignTypes] = useState<string[]>([]);
//   const [linkedin, setLinkedin] = useState('');
//   const [team, setTeam] = useState('');
//   const [teamName, setTeamName] = useState('');
//   const [teamSize, setTeamSize] = useState('');
//   const [checked1, setChecked1] = useState(false);
//   const [checked2, setChecked2] = useState(false);
//   const [checked3, setChecked3] = useState(false);
//   const [referredBy, setReferredBy] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Save all form data to localStorage
//     localStorage.setItem('registrationData', JSON.stringify({
//       slug,
//       phone,
//       location,
//       designTypes,
//       linkedin,
//       team,
//       teamName,
//       teamSize,
//       referredBy,
//       checked1,
//       checked2,
//       checked3,
//     }));

//     // Redirect to register/pay page
//     router.push(`/events/${slug}/register`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-100 py-10 px-6">
//       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Info</h2>

//         {/* All input fields as in your original form */}
//         <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full px-4 py-2 border rounded-md" />
//         <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" className="w-full px-4 py-2 border rounded-md" />

//         <select multiple required value={designTypes} onChange={(e) => setDesignTypes(Array.from(e.target.selectedOptions, o => o.value))} className="w-full px-4 py-2 border rounded-md">
//           <option value="UI/UX">UI/UX</option>
//           <option value="Graphic">Graphic</option>
//           <option value="Product">Product</option>
//         </select>

//         <input type="url" required value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn" className="w-full px-4 py-2 border rounded-md" />

//         <select required value={team} onChange={(e) => setTeam(e.target.value)} className="w-full px-4 py-2 border rounded-md">
//           <option value="">Do you have a team?</option>
//           <option value="Yes">Yes</option>
//           <option value="No">No</option>
//         </select>

//         {team === 'Yes' && (
//           <>
//             <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" className="w-full px-4 py-2 border rounded-md" />
//             <input type="number" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} min={2} max={6} className="w-full px-4 py-2 border rounded-md" placeholder="Team Size (2–6)" />
//           </>
//         )}

//         <label><input type="checkbox" checked={checked1} onChange={() => setChecked1(!checked1)} required /> Read terms *</label>
//         <label><input type="checkbox" checked={checked2} onChange={() => setChecked2(!checked2)} required /> Completed payment *</label>
//         <label><input type="checkbox" checked={checked3} onChange={() => setChecked3(!checked3)} /> Outside India</label>

//         <input type="text" value={referredBy} onChange={(e) => setReferredBy(e.target.value)} placeholder="Referred by (optional)" className="w-full px-4 py-2 border rounded-md" />

//         <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">Proceed to Pay</button>
//       </form>
//     </div>
//   );
// }
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const { slug } = useParams();

  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [designTypes, setDesignTypes] = useState<string[]>([]);
  const [linkedin, setLinkedin] = useState('');
  const [team, setTeam] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [referredBy, setReferredBy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem(
      'registrationData',
      JSON.stringify({
        slug,
        phone,
        location,
        designTypes,
        linkedin,
        team,
        teamName,
        teamSize,
        referredBy,
        checked1,
        checked2,
        checked3,
      })
    );

    router.push(`/events/${slug}/register`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-black border border-yellow-400 p-8 rounded-2xl space-y-6 shadow-2xl animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-2">
           Register for Event
        </h2>

        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=" Phone Number"
          className="w-full px-4 py-3 bg-black border border-white rounded-lg placeholder:text-white focus:ring-2 focus:ring-yellow-300"
        />

        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder=" City, State"
          className="w-full px-4 py-3 bg-black border border-white rounded-lg placeholder:text-white focus:ring-2 focus:ring-yellow-300"
        />

        <select
          multiple
          required
          value={designTypes}
          onChange={(e) =>
            setDesignTypes(Array.from(e.target.selectedOptions, (o) => o.value))
          }
          className="w-full px-4 py-3 bg-black border border-white rounded-lg text-white focus:ring-2 focus:ring-yellow-300"
        >
          <option disabled value="">
            Select one or more design types
          </option>
          <option value="UI/UX">UI/UX</option>
          <option value="Graphic">Graphic</option>
          <option value="Product">Product</option>
        </select>

        <input
          type="email"
          required
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder=" Enter email in format abc@gmail.com"
          className="w-full px-4 py-3 bg-black border border-white rounded-lg placeholder:text-white focus:ring-2 focus:ring-yellow-300"
        />

        <select
          required
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="w-full px-4 py-3 bg-black border border-white rounded-lg text-white focus:ring-2 focus:ring-yellow-300"
        >
          <option value="">Do you have a team?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {team === 'Yes' && (
          <>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="👥 Team Name"
              className="w-full px-4 py-3 bg-black border border-white rounded-lg placeholder:text-white focus:ring-2 focus:ring-yellow-300"
            />

            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              min={2}
              max={6}
              placeholder="👤 Team Size (2–6)"
              className="w-full px-4 py-3 bg-black border border-white rounded-lg placeholder:text-white focus:ring-2 focus:ring-yellow-300"
            />
          </>
        )}

        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked1}
              onChange={() => setChecked1(!checked1)}
              required
              className="accent-yellow-400"
            />
            <span>You have read all the necessary things *</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked2}
              onChange={() => setChecked2(!checked2)}
              required
              className="accent-yellow-400"
            />
            <span>Payment completed and screenshot sent/will send *</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked3}
              onChange={() => setChecked3(!checked3)}
              className="accent-yellow-400"
            />
            <span>Outside India registration</span>
          </label>
        </div>

        <input
          type="text"
          value={referredBy}
          onChange={(e) => setReferredBy(e.target.value)}
          placeholder=" Referred By (optional)"
          className="w-full px-4 py-3 bg-black border border-white rounded-lg placeholder:text-white focus:ring-2 focus:ring-yellow-300"
        />

        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition hover:scale-105"
        >
           Proceed to Pay
        </button>
      </form>
    </main>
  );
}
