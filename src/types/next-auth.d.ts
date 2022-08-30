import { DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    session: {
      accessToken: string
      provider: string
    } & DefaultSession['session']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: {
      accessToken: string
      provider: string
    } & DefaultJWT['token']
  }
}
