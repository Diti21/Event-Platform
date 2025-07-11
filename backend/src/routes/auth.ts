// // backend/routes/auth.ts
// import express from 'express';
// import NextAuth from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';

// const router = express.Router();
// const prisma = new PrismaClient();

// const authHandler = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   session: { strategy: 'jwt' },
//   callbacks: {
//     async session({ session, token }) {
//       //session.user.id = token.sub;
//       return session;
//     },
//   },
// });

// router.use(authHandler);

// export default router;

// // Middleware to verify JWT sent from frontend
// const verifyToken = async (req:any, res:any, next:any) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: "Token missing" });

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// // Protected route (example)
// router.get("/me", verifyToken, async (req:any, res:any) => {
//   const email = req.user.email;
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) return res.status(404).json({ error: "User not found" });

//   res.json({ user });
// });

// export default router;
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;

// Signup
router.post('/signup', async (req:any, res:any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      return res.status(400).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hash },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Login
router.post('/login', async (req:any, res:any) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user|| !user.password  || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
});

export default router;
