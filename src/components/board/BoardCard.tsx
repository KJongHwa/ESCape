import { Article } from '@/dtos/ArticleDto'
import KebabIcon from '@icons/kebab_icon.svg'
import ProfileIcon from '@icons/profile_icon.svg'
import HeartIcon from '@icons/board_heart_icon.svg'
import Image from 'next/image'
import timeAgo from '@/utils/timeAgo'
import Dropdown from '@/components/board/DropDown'
import Link from 'next/link'
import { useState } from 'react'
import BoardPatchModal from '@/components/board/BoardPatchModal'
import BoardDeleteModal from '@/components/board/BoardDeleteModal'

export interface BoardCardProps {
  article: Article
  userId: number
}

export default function BoardCard({ article, userId }: BoardCardProps) {
  const [isPatchOpen, setIsPatchOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const togglePatchModal = () => setIsPatchOpen(prevState => !prevState)
  const toggleDeleteModal = () => setIsDeleteOpen(prevState => !prevState)

  // 게시물 수정하기를 클릭할 시 수정 모달을 열어주는 이벤트 핸들러
  const handlePatchModal = () => {
    setIsPatchOpen(!isPatchOpen)
  }

  // 게시물 삭제하기를 클릭할 시 삭제 모달을 열어주는 이벤트 핸들러
  const handleDeleteModal = () => {
    setIsDeleteOpen(!isDeleteOpen)
  }

  return (
    <>
      <div className="h-[176px] rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-6 py-4">
        <div className="flex justify-between gap-2.5">
          <Link href={`/board/${article?.id}`} className="w-full">
            <p className="line-clamp-2 h-[72px] w-full break-words text-[18px] font-medium leading-7 text-brand-white">
              {article?.title ? article.title : '제목이 들어가는 영역입니다.'}
            </p>
          </Link>
          {article?.imageIdList.length !== 0 ? (
            <Image
              className="border-brand-black-light] h-[72px] w-[72px] rounded-lg border-[1px] border-solid"
              src={`${process.env.NEXT_PUBLIC_BOARD_API_URL}/images/${article?.imageIdList.at(-1)}`}
              alt="게시물 이미지"
              width={72}
              height={72}
            />
          ) : null}
          <Dropdown
            width="w-[120px]"
            buttonChildren={
              <div className={`${userId === article.writer.id ? '' : 'hidden'} h-6 w-6`}>
                <Image src={KebabIcon} alt="수정 & 삭제하기" width={24} height={24} />
              </div>
            }
          >
            <button type="button" onClick={handlePatchModal}>
              수정하기
            </button>
            <button type="button" onClick={handleDeleteModal}>
              삭제하기
            </button>
          </Dropdown>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              className="h-8 w-8 rounded-full"
              src={article.writer.image === 'string' ? ProfileIcon : article.writer.image}
              alt="작성자 이미지"
              width={32}
              height={32}
            />
            <p className="line-clamp-1 max-w-[260px] break-words pr-1 text-[14px] font-medium leading-[17px] text-brand-white">
              {article?.writer.nickname ? article.writer.nickname : '알 수 없음'}
            </p>
            <p className="border-l-[1px] border-solid border-brand-black-light pl-4 text-[14px] font-medium leading-[17px] text-brand-gray-dark">
              {timeAgo(article?.createdAt)}
            </p>
          </div>
          <div className="text-[14px] font-medium leading-[17px] text-brand-gray-dark">
            {article?.likeCount ? (
              <div className="flex gap-1">
                <Image src={HeartIcon} alt="heart" width={16} height={16} />
                {article.likeCount}
              </div>
            ) : (
              <div className="flex gap-1">
                <Image src={HeartIcon} alt="heart" />0
              </div>
            )}
          </div>
        </div>
      </div>
      <BoardPatchModal id={article.id} isOpen={isPatchOpen} onClick={togglePatchModal} value="게시글 수정" />
      <BoardDeleteModal id={article.id} isOpen={isDeleteOpen} onClick={toggleDeleteModal} />
    </>
  )
}
