import ProductMain from '@/components/product/ProductMain'
import ReviewerRanking from '@/components/product/ReviewerRanking'
import CategoryList from '@/components/product/CategoryList'
import { getProduct } from '@/libs/axios/product/productApi'
import { ResponseProductListTypes } from '@/dtos/ProductDto'

export const getStaticProps = async () => {
  const responseReviewCountData = await getProduct({ order: 'reviewCount' })
  const responseRatingData = await getProduct({ order: 'rating' })

  const initialData = { responseReviewCountData, responseRatingData }
  return {
    props: {
      initialData,
    },
  }
}

export interface InitialDataType {
  responseReviewCountData: ResponseProductListTypes
  responseRatingData: ResponseProductListTypes
}

interface ProductPageProps {
  initialData: InitialDataType
}

export default function ProductPage({ initialData }: ProductPageProps) {
  return (
    <main className="m-auto flex max-w-[1800px] xl:justify-between">
      <CategoryList />
      <div className="flex max-w-[1500px] flex-grow flex-col justify-between gap-[20px] px-5 pt-[30px] md:w-full md:pl-[25px] md:pr-[30px] md:pt-10 xl:flex-row-reverse xl:gap-[30px] xl:pr-0 xl:pt-0">
        <ReviewerRanking />
        <ProductMain initialData={initialData} />
      </div>
    </main>
  )
}
