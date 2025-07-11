// // src/routes/admin.ts
// import express from 'express';
// import { authMiddleware } from '../middleware/auth';
// import { PrismaClient } from '@prisma/client';
// const router = express.Router();
// const prisma = new PrismaClient();

// // Adjust if different


// router.get('/registrants', authMiddleware, async (req, res) => {
//   try {
//     const users = await prisma.registration.findMany({
//       include: { event: true },
//       orderBy: { createdAt: 'desc' },
//     });
//     res.json(users);
//   } catch (err) {
//     console.error('Error fetching registrants:', err);
//     res.status(500).json({ error: 'Failed to fetch registrants' });
//   }
// });

// export default router;
// src/routes/admin.ts




import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';
// const router = express.Router();
 const prisma = new PrismaClient(); // your Prisma instance

const router = express.Router();

// 🛡️ Only fetch registrations for events created by the logged-in user
router.get('/registrants', authMiddleware, async (req:any, res:any) => {
  const userId = req.user?.userId;

  try {
    // Get all events created by this user
    const events = await prisma.event.findMany({
      where: { createdById: userId },
      
      select: { slug: true },
    });

    const eventSlugs = events.map((e) => e.slug);

    const registrations = await prisma.registration.findMany({
      where: { eventSlug: { in: eventSlugs } },
      include: { event: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(registrations);
  } catch (err) {
    console.error('Error fetching registrants:', err);
    res.status(500).json({ error: 'Failed to fetch registrants' });
  }
});

export default router;
