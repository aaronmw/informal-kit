'use client'

import { SpotCopy } from '../Contentful/SpotCopy'
import { Icon } from '../Icon'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { classNames } from './classNames'

interface CarouselProps {
  media: {
    node: ReactNode
    description: string
  }[]
  transitionDuration?: number
  autoPlayInterval?: number
}

export function Carousel({
  autoPlayInterval = 5000,
  media,
  transitionDuration = 700,
}: CarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const [images, descriptions] = media.reduce(
    ([images, descriptions], { node, description }, currentIndex) => [
      [...images, node],
      [...descriptions, description || `Image ${currentIndex + 1}`],
    ],
    [[], []] as [ReactNode[], string[]],
  )

  const showNext = useCallback(() => {
    setActiveImageIndex(index => (index + 1) % images.length)
  }, [images.length])

  const showPrevious = useCallback(() => {
    setActiveImageIndex(index => (index - 1 + images.length) % images.length)
  }, [images.length])

  const handleClickNext = () => {
    setIsAutoPlaying(false)
    showNext()
  }

  const handleClickPrevious = () => {
    setIsAutoPlaying(false)
    showPrevious()
  }

  const handleClickImage = (index: number) => {
    setIsAutoPlaying(false)
    setActiveImageIndex(index)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(showNext, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, autoPlayInterval, showNext])

  useEffect(() => {
    if (!isAutoPlaying) return

    setIsTransitioning(true)

    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, transitionDuration)

    return () => clearTimeout(timer)
  }, [activeImageIndex, isAutoPlaying, transitionDuration])

  return (
    <div className={classNames.container}>
      <div className={classNames.descriptionAndButtonsContainer}>
        <div>
          <SpotCopy
            path="informal/about/meet-the-team"
            disableEditing={true}
            decorativeHeadings
            headingLevel={2}
          />

          <div className={classNames.description({ isActive: true })}>
            {descriptions[activeImageIndex]}
          </div>
        </div>

        <div className={classNames.slideControlsContainer}>
          <button
            className="link"
            onClick={handleClickPrevious}
          >
            <Icon name="arrow-left-long" />
            <span className="sr-only">Previous</span>
          </button>

          <div className={classNames.progressBarContainer({ isAutoPlaying })}>
            <div
              className={classNames.progressBar({ isAutoPlaying })}
              style={{
                transitionDuration: `${isTransitioning ? 0 : autoPlayInterval - transitionDuration}ms`,
                width: isTransitioning ? '0' : '100%',
              }}
            />
          </div>

          <button
            className="link"
            onClick={handleClickNext}
          >
            <span className="sr-only">Next</span>
            <Icon name="arrow-right-long" />
          </button>

          <button
            className="link"
            onClick={() => setIsAutoPlaying(isAutoPlaying => !isAutoPlaying)}
          >
            <Icon
              name={isAutoPlaying ? 'pause' : 'play'}
              variant="sharp-solid"
            />
            <span className="sr-only">{isAutoPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <span
            className={twJoin(
              'label',
              classNames.progressText({ isTransitioning }),
            )}
            style={{
              transitionDuration: `${transitionDuration}ms`,
            }}
          >
            {activeImageIndex + 1} of {images.length}
          </span>
        </div>
      </div>

      <div
        className={classNames.imagesContainer}
        style={{
          marginLeft: `calc((8rem + 1.5rem) * ${activeImageIndex} * -1)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <div
            className={classNames.imageContainer({
              isActive: index === activeImageIndex,
            })}
            key={index}
            style={{
              transitionDuration: `${transitionDuration}ms`,
            }}
            onClick={handleClickImage.bind(null, index)}
          >
            {image}
          </div>
        ))}
      </div>
    </div>
  )
}
