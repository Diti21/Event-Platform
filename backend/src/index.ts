
// // import express from 'express';
// // import cors from 'cors';
// // import helmet from 'helmet';
// // import rateLimit from 'express-rate-limit';
// // import dotenv from 'dotenv';
// // import path from 'path';

// // dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// // import paymentRoutes from './routes/payments';
// // import emailRoutes from './routes/email';

// // const app = express();

// // //  CORS: Allow requests from frontend (can add prod domain later)
// // app.use(cors({
// //   origin: ['http://localhost:4001'], // Update to your frontend domain in prod
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   credentials: true
// // }));

// // //  Security & Performance Middleware
// // app.use(helmet());
// // app.use(express.json());

// // //  Rate limiter (protects from abuse: 100 req/min per IP)
// // app.use(rateLimit({
// //   windowMs: 60 * 1000, // 1 minute
// //   max: 100,
// //   message: 'Too many requests from this IP, please try again later.'
// // }));

// // //  Routes
// // app.use('/api/payment', paymentRoutes);
// // app.use('/api/email', emailRoutes);


// // app.use((err: any, req: any, res: any, next: any) => {
// //   console.error(' Server Error:', err);
// //   res.status(500).json({ error: 'Internal Server Error' });
// // });

// // //  Start server
// // const PORT = process.env.PORT || 4000;
// // app.listen(PORT, () => {
// //   console.log(` Backend listening on http://localhost:${PORT}`);
// // });
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// import paymentRoutes from './routes/payments';
// import eventRoutes from './routes/events';
// //import emailRoutes from './routes/email'; // Optional, in case you use this route separately

// const app = express();

// // CORS: allow frontend
// app.use(cors({
//   origin: ['http://localhost:4001'], // Change for production
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// // Middleware
// app.use(helmet());
// app.use(express.json());

// app.use(rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.',
// }));

// // Routes
// app.use('/api/payment', paymentRoutes);
// app.use('/api/events' , eventRoutes);
// //app.use('/api/email', emailRoutes); // Optional

// // Global error handler
// app.use((err: any, req: any, res: any, next: any) => {
//   console.error('Server Error:', err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// // Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Backend listening on http://localhost:${PORT}`);
// });



// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// import paymentRoutes from './routes/payments';
// import eventRoutes from './routes/events';
// import authRoutes from './routes/auth'; 
// import adminRoutes from './routes/admin';

// // ✅ ADD THIS

// const app = express();

// // ✅ Allow frontend (adjust origin in prod)
// app.use(cors({
//   origin: ['http://localhost:4001'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// app.use(helmet());
// app.use(express.json());

// app.use(rateLimit({
//   windowMs: 60 * 1000,
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.',
// }));

// // ✅ Route setup
// app.use('/api/payment', paymentRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/auth', authRoutes); // ✅ ADD THIS
// app.use('/api/admin', adminRoutes);

// // Error handler
// app.use((err: any, req: any, res: any, next: any) => {
//   console.error('Server Error:', err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`✅ Backend listening on http://localhost:${PORT}`);
// });




// index.ts

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import paymentRoutes from './routes/payments';
import eventRoutes from './routes/events';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import emailAllRoutes from './routes/emailall'; // ✅ your bulk-email route

const app = express();

app.use(cors({
  origin: ['http://localhost:4001'], // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(helmet());
app.use(express.json());

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
}));

// ✅ Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/admin', emailAllRoutes); // ✅ Mount under same prefix as other admin routes
// ✅ Mounts bulk-email route

// Global error handler
app.use((err:any, req:any, res:any, next:any) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
