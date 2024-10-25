import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '@/libs/axios/mypage/apis'
import { Spinner } from 'flowbite-react'
import Profile from '@/components/mypage/Profile'
import ActivityCardList from '@/components/mypage/ActivityCardList'
import ProductCardList from '@/components/mypage/ProductCardList'

export default function MyPage() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  })

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>failed..</p>

  return (
    <>
      <div className="m-auto mt-[30px] max-w-[335px] md:mt-[40px] md:max-w-[509px] xl:mt-[60px] xl:max-w-[1340px]">
        <section className="mb-[60px] xl:float-left xl:mr-[60px]">
          <Profile data={data} />
        </section>
        <section className="mb-[60px]">
          <ActivityCardList data={data} />
        </section>
        <ProductCardList data={data} />
      </div>
    </>
  )
}
