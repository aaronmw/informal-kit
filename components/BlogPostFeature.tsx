'use client'

import { BlogPostMetaData } from './BlogPostMetaData'
import { SiteContentContainer } from './SiteContentContainer'

import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { getBlogPostImageURL } from '../lib/getBlogPostImageURL'
import { BlogPost as BlogPostType } from '../lib/types'

interface BlogPostFeatureProps extends ComponentProps<'div'> {
  post: BlogPostType
}

export function BlogPostFeature({
  className,
  post,
  ...otherProps
}: BlogPostFeatureProps) {
  const featureImageURL = getBlogPostImageURL(post)
  const { slug, title } = post

  return (
    <div
      className={twMerge('relative overflow-hidden', className)}
      {...otherProps}
    >
      <SiteContentContainer className="mt-20 flex flex-col gap-12">
        <div className="is-inverted relative z-10 space-y-6">
          <h1 className="h2">{title}</h1>

          <BlogPostMetaData post={post} />

          <Link
            href={`/blog/${slug}`}
            className="button-secondary"
          >
            Read more
          </Link>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            alt={title}
            src={featureImageURL}
            fill={true}
            className="object-cover"
          />
        </div>
      </SiteContentContainer>
    </div>
  )
}
