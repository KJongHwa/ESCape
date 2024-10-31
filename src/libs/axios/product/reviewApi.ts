import { ProductReviewListTypes } from '@/dtos/ProductDto'
import { CreateReviewRequestBody, UpdateReviewRequestBody } from '@/dtos/ReviewDto'
import axiosInstance from '../axiosInstance'

export const fetchReviews = async (productId: number, sortOption: string): Promise<ProductReviewListTypes[]> => {
  const response = await axiosInstance.get(`/products/${productId}/reviews`, {
    params: {
      order: sortOption,
    },
  })
  return response.data.list
}

export const createReview = async (reviewData: CreateReviewRequestBody) => {
  const response = await axiosInstance.post(`/reviews/`, reviewData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const updateReview = async (reviewId: number, reviewData: UpdateReviewRequestBody) => {
  const response = await axiosInstance.patch(`/reviews/${reviewId}`, reviewData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const deleteReview = async (reviewId: number) => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await axiosInstance.post(`/images/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data.url
}

export const addReviewLike = async (reviewId: number) => {
  const response = await axiosInstance.post(`/reviews/${reviewId}/like`)
  return response.data
}

export const removeReviewLike = async (reviewId: number) => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}/like`)
  return response.data
}
