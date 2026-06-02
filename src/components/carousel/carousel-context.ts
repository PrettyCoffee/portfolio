import { createContext, use } from "react"

export type SlideDirection = "left" | "right"

interface CarouselContextState {
  activeIndex: number
  prevIndex: number
  direction: SlideDirection
}

export const CarouselContext = createContext<CarouselContextState | null>(null)
CarouselContext.displayName = "CarouselContext"

export const useCarouselContext = () => {
  const state = use(CarouselContext)
  if (!state) {
    throw new Error("Missing Carousel context")
  }
  return state
}
