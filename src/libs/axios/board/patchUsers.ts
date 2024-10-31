import Axios from 'axios'
import { UserData } from '@/dtos/ArticleDto'

const BASE_URL = process.env.NEXT_PUBLIC_BOARD_API_URL

export async function patchUsers({ id, nickname, description, image }: UserData) {
  const url = `${BASE_URL}/users`
  const responses = await Axios.patch(
    url,
    { id, nickname, description, image },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  return responses.data
}
