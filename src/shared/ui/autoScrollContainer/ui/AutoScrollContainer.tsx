import { useEffect, useRef } from 'react'
import { TAutoScrollContainer } from '../model/types'

export default function AutoScrollContainer({ speed, children}: TAutoScrollContainer) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    if(!speed || speed==0)return
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += speed
        if (
          scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
          scrollRef.current.scrollHeight
        ) {
          scrollRef.current.scrollTop = 0
        }
      }
      rafRef.current = requestAnimationFrame(scroll)
    }

    rafRef.current = requestAnimationFrame(scroll)
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [speed])

  return (
    <div className='overflow-y-scroll h-64' tabIndex={0} ref={scrollRef}>
      {children}
    </div>
  )
}