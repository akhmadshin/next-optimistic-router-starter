import NextLink, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import { handleOptimisticNavigation } from 'next-optimistic-router';
import singletonRouter from 'next/router';

type NextLinkProps = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps>

type Props = NextLinkProps & {
  placeholderData?: object;
}
export const Link = React.forwardRef<HTMLAnchorElement, Props>(function LinkComponent(props, forwardedRef) {
  const {
    onClick,
    href,
    placeholderData,
    children,
    ...restProps
  } = props;
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    handleOptimisticNavigation(href, singletonRouter, () => {
      window.placeholderData = placeholderData;
    });
  }

  return (
    <NextLink
      onClick={handleClick}
      href={href}
      prefetch={false}
      ref={forwardedRef}
      {...restProps}
    >{children}</NextLink>
  )
})