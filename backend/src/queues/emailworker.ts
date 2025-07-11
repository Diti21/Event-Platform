// import { Worker } from 'bullmq';
// import { Redis } from 'ioredis';
// import { Resend } from 'resend';
// import dotenv from 'dotenv';

// dotenv.config();

// const resend = new Resend(process.env.EMAIL_KEY!);

// const worker = new Worker(
//   'bulk-emails',
//   async (job) => {
//     const { emails, subject, body } = job.data;

//     for (const email of emails) {
//       try {
//         await resend.emails.send({
//           from: process.env.EMAIL_FROM!,
//           to: email,
//           subject,
//           html: `<p>${body}</p>`,
//         });
//         console.log(`✅ Sent to ${email}`);
//       } catch (err) {
//         console.error(`❌ Failed to send to ${email}:`, err);
//       }
//     }
//   },
//   {
//     connection: new Redis(process.env.REDIS_URL!),
//   }
// );


import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Setup Resend client
const resend = new Resend(process.env.EMAIL_KEY!);


// Setup Redis connection with required BullMQ options
const connection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null, // ✅ Required by BullMQ
});

// Create a worker to process jobs from the queue named 'bulk-emails'
const worker = new Worker(
  'bulk-emails',
  async job => {
    const { emails, subject, body } = job.data;

    for (const email of emails) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: email,
          subject,
          html: `<p>${body}</p>`,
        });
        console.log(`✅ Sent to ${email}`);
      } catch (error) {
        console.error(`❌ Failed to send to ${email}:`, error);
      }
    }
  },
  { connection }
);

// Log worker lifecycle events
worker.on('completed', job => {
  console.log(` Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(` Job ${job?.id} failed:`, err);
});
