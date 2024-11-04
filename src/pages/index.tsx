import { motion } from 'framer-motion'
import Image from 'next/image'
import logoText from '@images/logo_text.svg'
import { useEffect, useRef, useState, WheelEvent } from 'react'
import image1 from '@images/mainimage1.png'
import image2 from '@images/mainImage2.png'
import image3 from '@images/mainimage3.png'
import image4 from '@images/mainimage4.png'
import logoSmall from '@images/logo_small.svg'
import { useRouter } from 'next/router'
import { PiCaretDoubleDownBold } from 'react-icons/pi'

export default function HomePage() {
  const router = useRouter()
  const scrollTargetRef = useRef<HTMLDivElement | null>(null)
  const [wheelValue, setWheelValue] = useState(0)
  const [growLogoSize, setGrowLogoSize] = useState(0)
  const handleWheelEvent = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollTargetRef.current === null) {
      return
    }
    const maxX = scrollTargetRef.current.scrollWidth - scrollTargetRef.current.clientWidth
    // 가로스크롤
    if (e.deltaY > 0) {
      setWheelValue(prev => {
        const newValue = prev + 100
        return Math.min(newValue, maxX)
      })
    } else if (e.deltaY < 0 || wheelValue > maxX) {
      if (growLogoSize) {
        setGrowLogoSize(prev => prev - 1)
        return
      }
      setWheelValue(prev => {
        const newValue = prev - 100
        return Math.max(newValue, 0)
      })
    }
    if (maxX <= wheelValue && growLogoSize < 15) {
      setGrowLogoSize(prev => prev + 1)
    } else if (maxX <= wheelValue && growLogoSize >= 15) {
      setGrowLogoSize(100)
      setTimeout(() => {
        router.push('product')
      }, 300)
    }
  }

  useEffect(() => {
    if (scrollTargetRef.current)
      scrollTargetRef.current.scrollTo({
        left: wheelValue,
        behavior: 'smooth',
      })
  }, [wheelValue])
  const imagesArr = [
    { image: image1, text: '인기있는 테마를 확인하세요', key: 1 },
    { image: image2, text: '테마의 정보를 살펴보세요', key: 2 },
    { image: image3, text: '사람들과 리뷰를 공유하세요', key: 3 },
    { image: image4, text: '지역별 테마를 찾아보세요', key: 4 },
  ]

  return (
    <div onWheel={handleWheelEvent} className="relative -mt-[100px] h-[100vh] w-full overflow-hidden">
      <div className="mx-auto mt-[110px] max-w-[400px] rounded-xl bg-brand-black-light p-10 px-4">
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="flex flex-col items-center gap-4 text-3xl font-bold"
        >
          <span>함께 만드는 방탈출 커뮤니티</span>
          <Image src={logoText} alt="로고" width={300} height={50} />
        </motion.div>
        <motion.div ref={scrollTargetRef} className="scroll-hidden flex snap-x gap-[50px] px-[100px] pt-5">
          {imagesArr.map(image => (
            <div
              className="relative flex h-[400px] shrink-0 snap-center flex-col items-center justify-between gap-10"
              key={image.key}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ root: scrollTargetRef }}
                className="relative h-[300px] w-[250px]"
              >
                <Image src={image.image} alt="이미지" fill />
              </motion.div>
              <motion.span
                initial={{ left: 100, opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                whileInView={{ opacity: 1, scale: 1, left: 0 }}
                className="relative text-xl font-bold text-brand-gray-light"
              >
                {image.text}
              </motion.span>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        animate={{ opacity: [0.5, 0.1, 0.5] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <PiCaretDoubleDownBold className="absolute bottom-[30px] left-1/2 h-[100px] w-[100px] -translate-x-1/2" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 z-20 -mt-[100px] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-full"
        initial={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        animate={{ scale: growLogoSize, opacity: 0.3 + growLogoSize / 20 }}
      >
        <Image src={logoSmall} alt="로고" width={50} height={50} />
      </motion.div>
    </div>
  )
}
