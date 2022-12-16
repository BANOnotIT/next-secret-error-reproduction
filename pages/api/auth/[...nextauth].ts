import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { Adapter } from "next-auth/adapters"


// it can't be stringified in JSON since due to circuar structure
const adapter = (()=> {
  const adapter: any = {}
  adapter.adapter = adapter
  return adapter
})() as unknown as Adapter<false>


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter,
  // NOTE no secret set, it'll try to generate one by itself
}

export default NextAuth(authOptions)
