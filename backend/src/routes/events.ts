// // import { Router } from 'express';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();
// // const router = Router();

// // router.post('/create', async (req: any, res: any) => {
// //   try {
// //     const { title, description, date, userEmail } = req.body;

// //     if (!title || !description || !date || !userEmail) {
// //       return res.status(400).json({ error: 'Missing fields' });
// //     }

// //     // Generate a unique slug with timestamp to avoid conflicts
// //     const slug = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

// //     const event = await prisma.event.create({
// //       data: {
// //         title,
// //         description,
// //         date: new Date(date),
// //         slug,
// //         createdBy: {
// //           connectOrCreate: {
// //             where: { email: userEmail },
// //             create: { email: userEmail, name: userEmail.split('@')[0] }, // optional name
// //           },
// //         },
// //       },
// //     });

// //     return res.status(200).json({ success: true, event });
// //   } catch (error) {
// //     console.error('Error creating event:', error);
// //     return res.status(500).json({ success: false, error: 'Internal server error' });
// //   }
// // });

// // export default router;
// // import { Router } from 'express';
// // import { PrismaClient } from '@prisma/client';

// // const prisma = new PrismaClient();
// // const router = Router();

// // router.post('/create', async (req:any, res:any) => {
// //   try {
// //     const { title, description, date, userEmail } = req.body;

// //     if (!title || !description || !date || !userEmail) {
// //       return res.status(400).json({ error: 'Missing fields' });
// //     }

// //     const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

// //     const event = await prisma.event.create({
// //       data: {
// //         title,
// //         description,
// //         date: new Date(date),
// //         slug,
// //         createdBy: {
// //           connectOrCreate: {
// //             where: { email: userEmail },
// //             create: { email: userEmail },
// //           },
// //         },
// //       },
// //     });

// //     return res.status(200).json({ success: true, event });
// //   } catch (error) {
// //     console.error('❌ Error creating event:', error);
// //     return res.status(500).json({ success: false, error: 'Internal server error' });
// //   }
// // });

// // export default router;
// import { Router } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { authMiddleware } from '../middleware/auth';

// const router = Router();
// const prisma = new PrismaClient();

// router.post('/create', authMiddleware, async (req:any, res:any) => {
//   const { title, description, date } = req.body;
//   const slug = title.toLowerCase().replace(/\s+/g, '-');
//   const user = req.user as { id: string };
//   const event = await prisma.event.create({
//     data: {
//       title,
//       description,
//       date: new Date(date),
//       slug,
//       createdBy: { connect: { id: req.user.id } }
//     },
//   });

//   res.json({ success: true, event });
// });
//  export default router;
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const prisma = new PrismaClient();
const router = express.Router();

// Protect route with authMiddleware
router.post('/create', authMiddleware, async (req:any, res:any) => {
  try {
    const { title, description, date ,tickets, participants, location } = req.body;

    //const slug = title.toLowerCase().replace(/\s+/g, '-');
    const rawSlug = title.toLowerCase().replace(/\s+/g, '-');
    const slug = `${rawSlug}-${Date.now()}`; 
    //const slug = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const user = req.user as { userId: string }; // ✅ from decoded JWT
   
    const event = await prisma.event.create({
      
      data: {
        title,
        description,
        date: new Date(date),
        slug,
        tickets: tickets ? Number(tickets) : null,
        //participants,
        location,
        createdBy: {
          connect: { id: user.userId }, // ✅ Fix: ensure userId is present in token
        },
      },
    });

    res.status(201).json({ event });
  } catch (err) {
    console.error('❌ Error creating event:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});


// GET /api/events
router.get('/', async (req, res) => {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
    include: { createdBy: true },
  });

  res.json(events);
});
// PUT /api/events/:id - Only creator can update their own event
router.put('/:id', authMiddleware, async (req: any, res: any) => {
  const eventId = req.params.id;
  const { title, description, date, tickets, location } = req.body;
  const user = req.user as { userId: string };

  try {
    // 🔍 1. Fetch the event
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // ❌ 2. Check ownership
    if (existingEvent.createdById !== user.userId) {
      return res.status(403).json({ error: 'You are not authorized to edit this event' });
    }

    // ✅ 3. Update if owner
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        title,
        description,
        date: new Date(date),
        tickets: tickets ? Number(tickets) : null,
        location,
      },
    });

    res.status(200).json({ success: true, event: updatedEvent });
  } catch (err) {
    console.error('❌ Error updating event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// GET /api/events/my-events — Return events created by the logged-in user
router.get('/my-events', authMiddleware, async (req: any, res: any) => {
  const user = req.user as { userId: string };

  try {
    const events = await prisma.event.findMany({
      where: { createdById: user.userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ success: true, events });
  } catch (err) {
    console.error('❌ Error fetching user events:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
});
// GET /api/events/:id - Fetch a single event by ID
router.get('/:id', authMiddleware, async (req: any, res: any) => {
  const { id } = req.params;
  const user = req.user as { userId: string };

  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Optional: Restrict to only the owner
    if (event.createdById !== user.userId) {
      return res.status(403).json({ error: 'You are not authorized to view this event' });
    }

    res.status(200).json({ success: true, event });
  } catch (err) {
    console.error('❌ Error fetching event:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch event' });
  }
});

export default router;
