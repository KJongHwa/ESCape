import { useRouter } from 'next/router'

const useRouteHandler = () => {
  const router = useRouter()
  const { category, keyword, order } = router.query
  const handleKeyword = (keyword: string) => {
    router.push({ pathname: '/product', query: { keyword: keyword } })
  }

  const handleCategory = (category: number) => {
    router.push({ pathname: '/product', query: { category: category } })
  }

  const handleQueryReset = () => {
    router.push('/product')
  }
  return { handleKeyword, handleCategory, handleQueryReset, category, keyword, order }
}

export default useRouteHandler
