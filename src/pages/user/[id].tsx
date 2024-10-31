import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthProvider'
import { getUserInfo } from '@/libs/axios/mypage/apis'
import { Spinner } from 'flowbite-react'
import Profile from '@/components/mypage/Profile'
import ActivityCardList from '@/components/mypage/ActivityCardList'
import ProductCardList from '@/components/mypage/ProductCardList'

export default function UserPage() {
  const { user: myInfo } = useAuth()
  const router = useRouter()
  const { id } = router.query
  const queryId = Array.isArray(id) ? id[0] : id

  /** 경로에 있는 유저 아이디가 내 아이디와 같다면 마이페이지로 리디렉션 */
  useEffect(() => {
    /** @todo 토스트나 모달 띄우기 */
    if (!queryId) {
      console.error('유효하지 않은 유저 아이디입니다.')
      return
    }

    if (myInfo && myInfo.id.toString() === queryId) {
      /** @todo 토스트나 모달 띄우기 */
      router.push('/mypage')
    }
  }, [myInfo, queryId, router])

  const {
    isPending,
    isError,
    data,
    refetch: refetchUserInfo,
  } = useQuery({
    queryKey: ['userInfo', queryId],
    queryFn: () => getUserInfo({ userId: queryId! }),
    enabled: !!queryId,
    refetchOnWindowFocus: true,
  })

  refetchUserInfo()

  if (!queryId) {
    return <div>유효하지 않은 유저 ID입니다.</div>
  }

  if (isPending) return <Spinner aria-label="로딩 중..." size="xl" />
  if (isError) return <p>failed..</p>

  return (
    <div className="m-auto my-[30px] max-w-[335px] md:my-[40px] md:max-w-[509px] xl:my-[60px] xl:max-w-[1340px]">
      <section className="mb-[60px] xl:float-left xl:mr-[60px]">
        <Profile data={data} refetchUserInfo={refetchUserInfo} />
      </section>
      <section className="mb-[60px]">
        <ActivityCardList data={data} />
      </section>
      <ProductCardList data={data} />
    </div>
  )
}
