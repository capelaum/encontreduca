import { deleteCookie } from 'cookies-next'
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

  api.defaults.headers.common.Authorization = `Bearer ${req.cookies.encontreduca_user_auth}`

  await api.post('/logout')

  deleteCookie('encontreduca_user_auth', { req, res })

  res.status(200).json({
    message: 'Logout realizado com sucesso!'
  })
}
