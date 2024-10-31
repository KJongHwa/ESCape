/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link'
import Image from 'next/image'
import { Spinner } from 'flowbite-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Logo from '@images/logo.svg'
import CustomButton from '@/components/@shared/ui/CustomButton'

interface NicknameFormInputs {
  nickname: string
}

export default function NicknamePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameFormInputs>()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<NicknameFormInputs> = async data => {
    setLoading(true)
    try {
      console.log('닉네임:', data.nickname)
    } catch (error) {
      console.error('닉네임 등록 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-[200px] max-w-[640px] p-3 text-white">
      <div className="flex justify-center">
        <Link href="/" className="inline-block py-10">
          <Image width={200} src={Logo} alt="로고 이미지" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <span className="block pb-1">닉네임</span>
          <input
            type="text"
            className={`w-full rounded-xl border-solid border-brand-black-light bg-brand-black-medium px-6 py-4 text-brand-gray-dark focus:outline-blue-gradation ${
              errors.nickname ? 'border-red-500' : ''
            }`}
            placeholder="닉네임을 입력해주세요"
            {...register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              maxLength: {
                value: 10,
                message: '닉네임은 최대 10자까지 가능합니다.',
              },
            })}
          />
          {errors.nickname && <p className="mt-2 text-sm text-red-500">{errors.nickname.message}</p>}
        </div>
        <div className="pt-2">
          <CustomButton styleType="primary" type="submit" active>
            {loading ? <Spinner aria-label="로딩 중..." size="md" /> : '가입하기'}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}
