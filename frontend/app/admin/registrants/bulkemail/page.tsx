'use client';
import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  tickets?: number;
  location?: string;
  slug: string;
  createdBy: {
    email: string;
  };
}

export default function BulkEmailPage() {
  const [eventSlug, setEventSlug] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState<Event[]>([]); // ✅ Properly typed

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/my-events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/registrant/bulkemail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventSlug, subject, body }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`✅ Sent to ${data.count} participants`);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl space-y-4">
      <h1 className="text-xl font-bold text-center">📧 Send Bulk Email</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span>Choose Event</span>
          <select
            value={eventSlug}
            onChange={(e) => setEventSlug(e.target.value)}
            className="w-full mt-1 border px-4 py-2 rounded-md"
            required
          >
            <option value="">-- Select Event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.slug}>
                {event.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span>Subject</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full mt-1 border px-4 py-2 rounded-md"
            required
          />
        </label>

        <label className="block">
          <span>Message Body</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full mt-1 border px-4 py-2 rounded-md"
            rows={6}
            required
          ></textarea>
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md"
        >
          Send Emails
        </button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
