// // import { Router } from 'express';
// // import { Resend } from 'resend';
// // import dotenv from 'dotenv';
// // import path from 'path';

// // dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// // const router = Router();
// // const resend = new Resend(process.env.EMAIL_KEY);

// // router.post('/bulk', async (req:any, res:any, next) => {
// //   try {
// //     const { subject, message, recipients } = req.body;

// //     if (!subject || !message || !Array.isArray(recipients) || recipients.length === 0) {
// //       return res.status(400).json({ error: 'Invalid input: Subject, message, and recipients are required' });
// //     }

// //     await resend.emails.send({
// //       from: process.env.EMAIL_FROM!,
// //       to: recipients,
// //       subject,
// //       html: message,
// //     });

// //     res.json({ success: true });
// //   } catch (error) {
// //     console.error(' Email send error:', error);
// //     res.status(500).json({ success: false, error: 'Failed to send emails' });
// //   }
// // });

// // export default router;
// import { Router } from 'express';
// import { Resend } from 'resend';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// const router = Router();
// const resend = new Resend(process.env.EMAIL_KEY);

// // Helper to split array into batches
// function chunkArray<T>(arr: T[], size: number): T[][] {
//   const result: T[][] = [];
//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }
//   return result;
// }

// router.post('/bulk', async (req:any, res:any) => {
//   try {
//     const { subject, message, recipients } = req.body;

//     if (!subject || !message || !Array.isArray(recipients) || recipients.length === 0) {
//       return res.status(400).json({
//         error: 'Invalid input: Subject, message, and recipients are required',
//       });
//     }

//     const batches = chunkArray(recipients, 500);
//     let totalSent = 0;
//     let failedBatches = 0;

//     for (const batch of batches) {
//       try {
//         await resend.emails.send({
//           from: process.env.EMAIL_FROM!,
//           to: batch,
//           subject,
//           html: message,
//         });
//         totalSent += batch.length;
//       } catch (err) {
//         console.error(' Failed batch:', batch, err);
//         failedBatches++;
//       }
//     }

//     if (failedBatches === 0) {
//       return res.json({ success: true, sent: totalSent });
//     } else if (totalSent > 0) {
//       return res.status(206).json({
//         success: false,
//         sent: totalSent,
//         message: `Partial success: ${totalSent} emails sent, ${failedBatches} batch(es) failed.`,
//       });
//     } else {
//       return res.status(500).json({ success: false, error: 'All email batches failed.' });
//     }
//   } catch (error) {
//     console.error(' Email send error:', error);
//     res.status(500).json({ success: false, error: 'Unexpected error occurred while sending emails' });
//   }
// });

// export default router;


