/* eslint-disable react/jsx-props-no-spreading */
import { useAuth } from '@/contexts/AuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import CustomButton from '@/components/@shared/ui/CustomButton'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Spinner } from 'flowbite-react'
import { useToaster } from '@/contexts/ToasterProvider'
import Logo from '../../../public/images/logo.svg'

interface NicknameForm {
  nickname: string
}

export default function GoogleSignupPage() {
  const { oAuthLogin } = useAuth()
  const provider = 'google'
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const toaster = useToaster()

  const redirectUri = `http://localhost:3000/oauth/${provider}`

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NicknameForm>()

  const onSubmit = async (data: NicknameForm) => {
    const token = localStorage.getItem('authCode')
    if (!token) {
      toaster('fail', '인증 코드가 없습니다. 다시 로그인 해주세요.')
      return
    }
    const formData = {
      nickname: data.nickname,
      redirectUri,
      token,
    }

    console.log(formData)

    try {
      const res = await fetch(`https://mogazoa-api.vercel.app/8-5/auth/signUp/${provider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await res.json()
      console.log('API Response:', result)

      if (result.accessToken) {
        await oAuthLogin({ redirectUri, token }, 'google')
        toaster('success', '로그인이 성공하였습니다.')
        localStorage.removeItem('authCode')
        router.push('/product')
      } else {
        setError('nickname', {
          type: 'server',
          message: result.message || '회원가입 실패. 다시 시도해 주세요.',
        })
      }
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err)
      setError('nickname', {
        type: 'server',
        message: '회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.',
      })
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
          <CustomButton styleType="primary" type="submit" active={!loading}>
            {loading ? <Spinner aria-label="로딩 중..." size="md" /> : '가입하기'}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}
