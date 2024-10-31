import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import imageIcon from '@icons/image_icon.svg'
import deleteIcon from '@icons/close_icon.svg'
import { Spinner } from 'flowbite-react'
import CustomButton from '../@shared/ui/CustomButton'

const INPUT_MAX_LENGTH = 10
const TEXTAREA_MAX_LENGTH = 300

type ProfileContentsTypes = {
  image: string | File | null
  nickname: string
  description: string
}

interface EditProfileProps extends ProfileContentsTypes {
  onEdit: (params: ProfileContentsTypes) => void
  isPending: boolean
}

export default function EditProfile({ image, nickname, description, onEdit, isPending }: EditProfileProps) {
  const [formValues, setFormValues] = useState({
    image,
    nickname,
    description,
  })
  const [previewImage, setPreviewImage] = useState<string | File | null>(image ?? null)
  const [inputCount, setInputCount] = useState<number>(description.length)

  const isFormComplete = useMemo(() => {
    const { image, nickname } = formValues
    const isAllInputFilled = nickname !== '' && image !== null
    return isAllInputFilled
  }, [formValues])

  /** @todo 파일 이름 한글인지 체크 */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selectedImageFile = e.target.files[0]

    if (previewImage && typeof previewImage === 'string') {
      URL.revokeObjectURL(previewImage)
    }

    const nextImage = URL.createObjectURL(selectedImageFile)
    setPreviewImage(nextImage)
    setFormValues(prevValues => ({
      ...prevValues,
      image: selectedImageFile,
    }))
  }

  const handleFileInputDelete = () => {
    if (previewImage && typeof previewImage === 'string') {
      URL.revokeObjectURL(previewImage)
    }

    setFormValues(prevValues => ({
      ...prevValues,
      image: null,
    }))
    setPreviewImage(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.slice(0, INPUT_MAX_LENGTH)
    setFormValues(prevValues => ({
      ...prevValues,
      [e.target.name]: inputValue,
    }))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.target.value.slice(0, TEXTAREA_MAX_LENGTH)
    setInputCount(textareaValue.length)
    setFormValues(prevValues => ({
      ...prevValues,
      [e.target.name]: textareaValue,
    }))
  }

  const inputClassNames =
    'w-full rounded-lg border border-brand-gray-dark bg-[#252530] p-5 placeholder:text-sm placeholder:font-normal placeholder:text-brand-gray-dark md:py-[23px]'

  return (
    <div className="flex w-full flex-col content-start items-stretch gap-5 md:gap-10">
      <h3 className="text-xl font-semibold leading-7 xl:text-2xl">프로필 편집</h3>
      <section className="flex flex-col items-start justify-start gap-[10px] md:gap-[15px] xl:gap-5">
        <div className="relative flex content-start items-center">
          <label
            className="relative inline-block h-[140px] w-[140px] cursor-pointer rounded-lg border border-unactive bg-[#252530] md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]"
            htmlFor="profileImage"
          >
            <div className="absolute left-1/2 top-1/2 float-left -translate-x-1/2 -translate-y-1/2 transform">
              <Image src={imageIcon} alt="이미지 아이콘" width={24} height={24} />
            </div>
            <input className="sr-only" id="profileImage" name="image" type="file" onChange={handleFileInputChange} />
          </label>

          {!!previewImage && (
            <div className="relative inline-block">
              <Image
                className="ml-[10px] inline-block h-[140px] w-[140px] rounded-lg object-cover md:h-[135px] md:w-[135px] xl:h-[160px] xl:w-[160px]"
                src={typeof previewImage === 'string' ? previewImage : ''}
                alt="업로드 한 이미지 미리보기"
                width={140}
                height={140}
              />
              <button onClick={handleFileInputDelete}>
                <Image
                  className="absolute right-2 top-2 rounded-full bg-brand-black-medium p-1 xl:h-[22px] xl:w-[22px]"
                  src={deleteIcon}
                  alt="이미지 삭제 아이콘"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>

        <input
          className={inputClassNames}
          value={formValues.nickname}
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          maxLength={INPUT_MAX_LENGTH}
          onChange={handleInputChange}
        />

        <div className="relative w-full">
          <textarea
            className={`${inputClassNames} scrollbar-hide`}
            value={formValues.description}
            id="description"
            name="description"
            placeholder="소개를 입력해 주세요"
            maxLength={TEXTAREA_MAX_LENGTH}
            onChange={handleTextAreaChange}
          />
          <p className="absolute bottom-5 right-5 text-right text-sm font-normal text-brand-gray-dark">
            <span>{inputCount}</span>/{TEXTAREA_MAX_LENGTH}
          </p>
        </div>
      </section>

      <CustomButton styleType="primary" active={isFormComplete || isPending} onClick={() => onEdit(formValues)}>
        {isPending ? <Spinner size="xl" /> : '저장하기'}
      </CustomButton>
    </div>
  )
}
