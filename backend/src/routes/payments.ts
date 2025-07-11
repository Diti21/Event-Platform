
// // import { Router } from 'express';
// // import Razorpay from 'razorpay';
// // import crypto from 'crypto';
// // import { PrismaClient } from '@prisma/client';
// // import dotenv from 'dotenv';
// // import path from 'path';

// // dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// // const prisma = new PrismaClient();
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID!,
// //   key_secret: process.env.RAZORPAY_SECRET!,
// // });

// // const router = Router();

// // // 1. Create Order & Pre-register user
// // router.post('/create', async (req: any, res: any) => {
// //   try {
// //     const { name, email, amount } = req.body;

// //     if (!name || !email || !amount) {
// //       return res.status(400).json({ error: 'Missing name, email, or amount' });
// //     }

// //     // Save new registration (no uniqueness on email)
// //     await prisma.registration.create({
// //       data: { name, email, paid: false },
// //     });

// //     // Create Razorpay order
// //     const order = await razorpay.orders.create({
// //       amount: amount * 100, // in paise
// //       currency: 'INR',
// //     });

// //     res.json({
// //       orderId: order.id,
// //       key: process.env.RAZORPAY_KEY_ID,
// //     });
// //   } catch (e) {
// //     console.error(' Create Order Error:', e);
// //     res.status(500).json({ error: 'Failed to initiate payment' });
// //   }
// // });

// // // 2. Verify Payment
// // router.post('/verify', async (req: any, res: any) => {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;

// //     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email) {
// //       return res.status(400).json({ success: false, error: 'Missing payment details' });
// //     }

// //     const hmac = crypto
// //       .createHmac('sha256', process.env.RAZORPAY_SECRET!)
// //       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
// //       .digest('hex');

// //     if (hmac !== razorpay_signature) {
// //       return res.status(400).json({ success: false, error: 'Invalid signature' });
// //     }

// //     // Find most recent unpaid user with this email
// //     const user = await prisma.registration.findFirst({
// //       where: { email, paid: false },
// //       orderBy: { id: 'desc' },
// //     });

// //     if (!user) {
// //       return res.status(404).json({ success: false, error: 'User not found or already paid' });
// //     }

// //     // Mark as paid
// //     await prisma.registration.update({
// //       where: { id: user.id },
// //       data: { paid: true },
// //     });

// //     res.json({ success: true });
// //   } catch (e) {
// //     console.error('Payment Verification Error:', e);
// //     res.status(500).json({ success: false, error: 'Verification failed' });
// //   }
// // });

// // export default router;
// import { Router } from 'express';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import { PrismaClient } from '@prisma/client';
// import { Resend } from 'resend';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// const prisma = new PrismaClient();
// const resend = new Resend(process.env.EMAIL_KEY);
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_SECRET!,
// });

// const router = Router();

// // 1. Create Razorpay Order and save user
// router.post('/create', async (req: any, res: any) => {
//   try {
//     const { name, email, amount, eventSlug } = req.body;

//     if (!name || !email || !amount || !eventSlug) {
//       return res.status(400).json({ error: 'Missing name, email, amount, or eventSlug' });
//     }

//     // Save registration with paid: false
//     await prisma.registration.create({
//       data: { name, email, eventSlug, paid: false },
//     });

//     // Create Razorpay order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // in paise
//       currency: 'INR',
//     });

//     res.json({
//       orderId: order.id,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     console.error('Create Order Error:', err);
//     res.status(500).json({ error: 'Failed to create Razorpay order' });
//   }
// });

// // 2. Verify payment and update registration
// router.post('/verify', async (req: any, res: any) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       email,
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email) {
//       return res.status(400).json({ success: false, error: 'Missing payment details' });
//     }

//     const hmac = crypto
//       .createHmac('sha256', process.env.RAZORPAY_SECRET!)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');

//     if (hmac !== razorpay_signature) {
//       return res.status(400).json({ success: false, error: 'Invalid signature' });
//     }

//     // Find the most recent unpaid registration
//     const user = await prisma.registration.findFirst({
//       where: { email, paid: false },
//       orderBy: { createdAt: 'desc' },
//     });

//     if (!user) {
//       return res.status(404).json({ success: false, error: 'User not found or already paid' });
//     }

//     // Update to mark as paid
//     await prisma.registration.update({
//       where: { id: user.id },
//       data: { paid: true },
//     });

//     // Send confirmation email
//     await resend.emails.send({
//       from: process.env.EMAIL_FROM!,
//       to: user.email,
//       subject: `✅ Registration Confirmed for ${user.eventSlug}`,
//       html: `<p>Hi ${user.name},</p><p>Thanks for registering for <b>${user.eventSlug}</b>. Your payment is confirmed!</p>`,
//     });

//     res.json({ success: true });
//   } catch (err) {
//     console.error('Payment Verification Error:', err);
//     res.status(500).json({ success: false, error: 'Internal server error' });
//   }
// });

// export default router;
// import { Router } from 'express';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import { PrismaClient } from '@prisma/client';
// import { Resend } from 'resend';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// const prisma = new PrismaClient({
//   // optional: helpful in high-concurrency scenarios
//   log: ['error', 'warn'],
// });

// const resend = new Resend(process.env.EMAIL_KEY);

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_SECRET!,
// });

// const router = Router();

// // Health check (useful for load balancers and monitoring)
// router.get('/health', (_, res:any) => res.status(200).json({ status: 'ok' }));

// // CREATE ORDER
// router.post('/create', async (req:any, res:any) => {
//   try {
//     const { name, email, amount, eventSlug } = req.body;

//     if (!name || !email || !amount || !eventSlug) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const [registration, order] = await Promise.all([
//       prisma.registration.create({
//         data: { name, email, eventSlug, paid: false },
//       }),
//       razorpay.orders.create({
//         amount: amount * 100,
//         currency: 'INR',
//       }),
//     ]);

//     res.status(200).json({
//       orderId: order.id,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     console.error('❌ /create error:', err);
//     res.status(500).json({ error: 'Server error while creating order' });
//   }
// });

// // VERIFY PAYMENT
// router.post('/verify', async (req:any, res:any) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email) {
//       return res.status(400).json({ success: false, error: 'Missing payment details' });
//     }

//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_SECRET!)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ success: false, error: 'Invalid payment signature' });
//     }

//     const user = await prisma.registration.findFirst({
//       where: { email, paid: false },
//       orderBy: { createdAt: 'desc' },
//     });

//     if (!user) {
//       return res.status(404).json({ success: false, error: 'User not found or already paid' });
//     }

//     await prisma.registration.update({
//       where: { id: user.id },
//       data: { paid: true },
//     });

//     // Send confirmation email asynchronously
//     resend.emails.send({
//       from: process.env.EMAIL_FROM!,
//       to: user.email,
//       subject: ` Registration Confirmed: ${user.eventSlug}`,
//       html: `<p>Hi ${user.name},</p><p>Your payment for <strong>${user.eventSlug}</strong> is confirmed.</p>`,
//     }).catch(err => console.error('Email send failed:', err)); // don't block response

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error(' /verify error:', err);
//     res.status(500).json({ success: false, error: 'Internal error during verification' });
//   }
// });

// export default router;


import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient({ log: ['error', 'warn'] });

const resend = new Resend(process.env.EMAIL_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

const router = Router();

// ✅ Health check route
//router.get('/health', (_, res) => res.status(200).json({ status: 'ok' }));

// ✅ CREATE ORDER - /api/payment/create
router.post('/create', async (req:any, res:any) => {
  try {
    const { name, email, amount, eventSlug } = req.body;

    if (!name || !email || !amount || !eventSlug) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Save unpaid registration
    const [registration, order] = await Promise.all([
      prisma.registration.create({
        data: { name, email, eventSlug, paid: false },
      }),
      razorpay.orders.create({
        amount: amount * 100,
        currency: 'INR',
      }),
    ]);

    // 2. Return order info to frontend
    res.status(200).json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('❌ Error in /create:', err);
    res.status(500).json({ error: 'Server error while creating order' });
  }
});

// ✅ VERIFY PAYMENT - /api/payment/verify
router.post('/verify', async (req:any, res:any) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      eventSlug,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !email ||
      !eventSlug
    ) {
      return res.status(400).json({ success: false, error: 'Missing payment details' });
    }

    // 1. Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid payment signature' });
    }

    // 2. Find unpaid user by email + eventSlug
    const user = await prisma.registration.findFirst({
      where: { email, eventSlug, paid: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found or already paid',
      });
    }

    // 3. Mark as paid
    await prisma.registration.update({
      where: { id: user.id },
      data: { paid: true },
    });

    // 4. Optional: Send confirmation email
    resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: user.email,
      subject: `✅ Registration Confirmed: ${user.eventSlug}`,
      html: `<p>Hi ${user.name},</p><p>Your payment for <strong>${user.eventSlug}</strong> is confirmed.</p>`,
    }).catch((err) => console.error('❌ Email failed:', err));

    // 5. Respond
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Error in /verify:', err);
    res.status(500).json({ success: false, error: 'Verification error' });
  }
});

export default router;
