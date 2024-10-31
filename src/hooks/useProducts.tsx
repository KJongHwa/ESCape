import { ResponseProductListTypes } from '@/dtos/ProductDto'
import { getProduct, ProductQueryParams } from '@/libs/axios/product/productApi'
import { useQuery } from '@tanstack/react-query'

export default function useProducts(params: ProductQueryParams) {
  return useQuery<ResponseProductListTypes | null>({
    queryKey: ['products', params],
    queryFn: () => getProduct(params),
  })
}
