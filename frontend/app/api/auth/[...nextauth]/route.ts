// // import NextAuth from "next-auth";
// // import GitHubProvider from "next-auth/providers/github"; // Or use GoogleProvider
// // import { PrismaAdapter } from "@auth/prisma-adapter";
// // import { prisma } from "@/lib/prisma"; // Your Prisma client

// // const handler = NextAuth({
// //   adapter: PrismaAdapter(prisma),
// //   providers: [
// //     GitHubProvider({
// //       clientId: process.env.GITHUB_ID!,
// //       clientSecret: process.env.GITHUB_SECRET!,
// //     }),
// //   ],
// //   session: { strategy: "jwt" },
// //   callbacks: {
// //     async session({ session, token }) {
// //       session.user.id = token.sub;
// //       return session;
// //     },
// //   },
// // });

// // export { handler as GET, handler as POST };
// // frontend/app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

// const handler = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   session: { strategy: "jwt" },
// });

// export { handler as GET, handler as POST };
