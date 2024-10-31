/* eslint-disable react/jsx-props-no-spreading */

import { useAuth } from '@/contexts/AuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import CustomButton from '@/components/@shared/ui/CustomButton'
import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import oAuthSignUp from '@/libs/axios/oauth/oAuthSignUp'
import Logo from '../../../public/images/logo.svg'

interface NicknameForm {
  nickname: string
}

interface OAuthSignUpResponse {
  ok: boolean
  message?: string
}

export default function KakaoSignupPage() {
  const { oAuthLogin } = useAuth()
  const provider = 'kakao'
  const router = useRouter()
  const { code } = router.query
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NicknameForm>()

  useEffect(() => {
    if (!code || typeof code !== 'string') {
      router.replace('/error')
      return
    }
    localStorage.setItem('authCode', code)
    window.close()
  }, [code, router])

  const onSubmit = async (data: NicknameForm) => {
    const token = localStorage.getItem('authCode')

    // alert 제거
    if (!token) {
      return
    }

    const formData = {
      nickname: data.nickname,
      redirectUri: `http://localhost:3000/oauth/${provider}`,
      token,
    }
    setLoading(true)

    try {
      const isSignUpSuccess = await oAuthSignUp(formData, provider)

      if (typeof isSignUpSuccess === 'boolean') {
        setError('nickname', {
          type: 'server',
          message: '회원가입 실패. 다시 시도해 주세요.',
        })
      } else {
        const { ok, message }: OAuthSignUpResponse = isSignUpSuccess

        if (ok) {
          await oAuthLogin({ token }, provider)
          localStorage.removeItem('authCode')
          router.push('/product')
        } else {
          setError('nickname', {
            type: 'server',
            message: message || '회원가입 실패. 다시 시도해 주세요.',
          })
        }
      }
    } catch {
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
          {errors.nickname && <p className="mt-2 text-sm text-red-500">{(errors.nickname as FieldError).message}</p>}
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
