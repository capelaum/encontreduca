import { api } from 'services/api'

export type NewSupportRequest = {
  user_id: string | number
  message: string
}

export async function createSupportRequest(
  newSupportRequest: NewSupportRequest
) {
  const response = await api.post('/support/requests', newSupportRequest)

  return response.data
}
