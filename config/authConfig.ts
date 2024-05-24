import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ControllersAuth from "../Controllers/Service/Auth";
import { TDBUser, TFormLogin } from "@/Types/Types";

const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SERCRET,
  pages: {
    signIn: "/sign",
  },
  callbacks: {
    async session({ session, token, user }) {
      const dataSessionUser = token.dataUser as TDBUser;
      return { ...session, dataSessionUser };
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        return {
          ...token,
          dataUser: JSON.parse(JSON.stringify(user)),
          // dataUser:{...user._doc}
        };
      }

      return token;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credatials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        INN: { label: "Phone", type: "number", placeholder: "jsmith" },
      },
      async authorize(credentials, req) {
        const resAuth = await ControllersAuth.Auth(credentials as TFormLogin);

        if (resAuth) return resAuth as any;
        return null;
      },
    }),
  ],
};

export default authConfig;
