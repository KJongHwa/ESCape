import Axios from 'axios'
import { ArticleFormData } from '@/dtos/ArticleDto'

const BASE_URL = process.env.NEXT_PUBLIC_BOARD_API_URL

export async function patchArticles({ formData, id }: { formData: FormData; id: number | undefined }) {
  const url = `${BASE_URL}/articles/${id}`
  const responses = await Axios.patch<ArticleFormData>(url, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return responses.data
}
