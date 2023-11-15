import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = nextAuth({
  providers: [
    Credentials({
      name: "my credential",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credential, req) {
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
