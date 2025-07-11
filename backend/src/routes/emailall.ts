// 

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { emailQueue } from '../queues/emailQueue';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();
const router = Router();

router.post('/registrant/bulkemail', async (req: any, res: any) => {
  const { eventSlug, subject, body } = req.body;

  if (!eventSlug || !subject || !body) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const participants = await prisma.registration.findMany({
      where: { eventSlug, paid: true },
    });

    const emailList = participants.map((p) => p.email);

    // ✅ Add job to the queue instead of sending directly
    await emailQueue.add('sendBulkEmails', {
      emails: emailList,
      subject,
      body,
    });

    res.json({ success: true, enqueued: emailList.length });
  } catch (err) {
    console.error('❌ Failed to enqueue bulk email:', err);
    res.status(500).json({ error: 'Failed to enqueue emails' });
  }
});

export default router;
