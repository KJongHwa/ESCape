import Axios from 'axios'
import { CommentData } from '@/dtos/ArticleDto'

const Base_URL = process.env.NEXT_PUBLIC_BOARD_API_URL

interface getArticleDetailCommentsParams {
  id: string | string[] | undefined
  currentPage: number
}

export async function getArticleDetailComments({
  id,
  currentPage,
}: getArticleDetailCommentsParams): Promise<CommentData> {
  try {
    const url = `${Base_URL}/articles/${id}/comments?page=${currentPage}&commentSize=4`

    const response = await Axios.get(url)
    return response.data
  } catch (e) {
    console.error('데이터를 불러오는데 오류가 있습니다:', e)
    throw e
  }
}
