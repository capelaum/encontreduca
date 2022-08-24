import { setCookie } from 'cookies-next'
import { getAuthUser } from 'lib/usersLib'
import { NextApiRequest, NextApiResponse } from 'next'
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
    const { email, password } = req.body
    const response = await api.post('login', { email, password })

    const { token, message } = response.data

    setCookie('encontreduca_user_auth', token, {
      req,
      res,
      maxAge: 30 * 24 * 60 * 60
    })

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    const authUser = await getAuthUser()

    res.status(200).json({
      message,
      authUser
    })
  } catch (error) {
    res.status((error as any).response.status).json({
      message: (error as any).response.data.message
    })
  }
}
