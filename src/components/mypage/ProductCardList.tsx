import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserProducts } from '@/libs/axios/mypage/apis'
import { ProductTypes } from '@/dtos/ProductDto'
import { UserTypes } from '@/dtos/UserDto'
import { Spinner } from 'flowbite-react'
import ProductCard from '../@shared/productCard/ProductCard'

interface ProductCardListProps {
  data: UserTypes
}

export default function ProductCardList({ data }: ProductCardListProps) {
  const [activeMenu, setActiveMenu] = useState<number>(0)
  const productMenuContents = [
    {
      id: 0,
      title: '리뷰 남긴 테마',
      type: 'reviewed',
    },
    {
      id: 1,
      title: '좋아요 누른 테마',
      type: 'favorite',
    },
  ]

  const {
    isPending,
    isError,
    data: productList,
    refetch: refetchProductList,
  } = useQuery<ProductTypes[]>({
    queryKey: ['productType', data.id, activeMenu],
    queryFn: () => getUserProducts({ userId: data.id, type: productMenuContents[activeMenu].type }),
    enabled: !!data.id,
    refetchOnWindowFocus: true,
  })

  const handleProductMenuClicked = (selectedId: number) => {
    setActiveMenu(selectedId)
  }

  refetchProductList()

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>테마 리스트 불러오기에 실패하였습니다. 다시 시도해주세요.</p>

  return (
    <section>
      <div className="mb-[30px] flex items-center justify-normal gap-10">
        {productMenuContents.map(productMenuContent => (
          <button
            key={productMenuContent.id}
            className={`text-lg xl:text-xl ${activeMenu === productMenuContent.id ? 'font-semibold text-brand-white' : 'font-normal text-brand-gray-dark'}`}
            onClick={() => handleProductMenuClicked(productMenuContent.id)}
          >
            {productMenuContent.title}
          </button>
        ))}
      </div>
      {productList && productList.length > 0 ? (
        <div className="grid grid-cols-2 gap-[15px] xl:grid-cols-3 xl:gap-5">
          {productList.map(product => (
            <ProductCard key={product.id} productId={product.id} data={product} />
          ))}
        </div>
      ) : (
        <p className="font-normal text-brand-gray-dark">아직 {productMenuContents[activeMenu].title}가 없습니다</p>
      )}
    </section>
  )
}
