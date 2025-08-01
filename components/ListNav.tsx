'use client'

import Link from 'next/link'
import { ComponentProps, useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { Icon } from './Icon'
import { IconString } from './Icon/types'

type ListNavProps = ComponentProps<'nav'> & {
  navTitle: React.ReactNode
  classNameForTitle?: string
}

export function ListNav({
  children,
  navTitle,
  className,
  classNameForTitle,
  ...otherProps
}: ListNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleUserInteraction() {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <nav
      className={twMerge(
        'relative z-50 overflow-hidden',
        'flex flex-col',
        'bg-theme-bg-color-shaded/50',
        'rounded-md',
        'transition-all',
        'is-stuck:backdrop-blur-sm',
        'is-stuck:mt-3',
        'lg:is-stuck:mt-6',
        'max-lg:cursor-pointer',
        'max-lg:is-stuck:is-open:bg-theme-bg-color-shaded/70',
        'max-lg:is-closed:bg-theme-accent-color',
        'max-lg:is-closed:text-theme-bg-color',
        className,
      )}
      data-open={isOpen || undefined}
      data-closed={!isOpen || undefined}
      {...otherProps}
    >
      <div
        className={twJoin(
          'js-list-nav-title',
          'flex items-center justify-between',
          'px-3 py-2',
          'cursor-pointer',
          'transition-all',
          'font-bold',
          'is-open:bg-theme-accent-color',
          'is-open:text-theme-bg-color',
          'lg:bg-theme-bg-color-shaded',
          'lg:pointer-events-none',
        )}
        onClick={handleUserInteraction}
      >
        <h2 className={classNameForTitle}>{navTitle}</h2>

        <Icon
          name={isOpen ? 'solid:xmark' : 'solid:caret-down'}
          className="lg:hidden"
        />
      </div>

      <div
        className={twJoin(
          'transition-all',
          'hidden',
          'is-open:block',
          'lg:block',
        )}
      >
        <ul>{children}</ul>
      </div>
    </nav>
  )
}

type ListNavItemProps = ComponentProps<'a'> & {
  icon?: IconString
  iconLeft?: IconString
  iconRight?: IconString
}

ListNav.Item = function ListNavItem({
  children,
  className,
  href = '#',
  icon,
  iconLeft,
  iconRight,
  ...otherProps
}: ListNavItemProps) {
  const leftIcon = iconLeft || icon
  const rightIcon = iconRight

  return (
    <li className={twMerge('group/list-nav-item w-full', className)}>
      <Link
        className={twMerge(
          'block',
          'flex items-center justify-between',
          'gap-2 px-3 py-2',
          'text-xs',
          'text-balance',
          'no-underline',
          'transition-all',
          'text-theme-text-color/60',
          'border-theme-text-color-faded/50',
          'border-t',
          'is-active:text-theme-text-color',
          'is-active:font-medium',
          'hover:text-theme-text-color/80',
          'hover:bg-theme-accent-color/10',
          'group-first/list-nav-item:border-t-0',
        )}
        href={href}
        {...otherProps}
      >
        <span className="flex items-center gap-2">
          {leftIcon && (
            <Icon
              name={leftIcon}
              className="flex-shrink-0"
            />
          )}
          <span>{children}</span>
        </span>
        {rightIcon && (
          <Icon
            name={rightIcon}
            className="flex-shrink-0"
          />
        )}
      </Link>
    </li>
  )
}
