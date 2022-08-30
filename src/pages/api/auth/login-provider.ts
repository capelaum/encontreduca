import { setCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { api } from 'services/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method not allowed'
    })
    return
  }

  try {
    const token = await getToken({ req })

    if (!token) {
      res.status(401).json({
        message: 'Unauthorized'
      })
      return
    }

    const { accessToken, provider } = token

    const response = await api.post(`login/${provider}`, { accessToken })

    const { token: userToken, message } = response.data

    setCookie('encontreduca_user_auth', userToken, {
      req,
      res,
      maxAge: 30 * 24 * 60 * 60
    })

    res.status(200).json({ message })
  } catch (error) {
    res.status((error as any).response.status).json({
      message: (error as any).response.data.message
    })
  }
}
