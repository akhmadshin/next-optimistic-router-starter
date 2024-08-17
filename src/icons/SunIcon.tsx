import { Component } from '@/types/general';
import { useTheme } from 'next-themes';
import { useIsMounted } from 'usehooks-ts'

interface Props {
  className?: string;
}
export const SunIcon: Component<Props> = ({ className }) => {
  const { theme } = useTheme();
  const isMounted = useIsMounted();

  let classNameByTheme = '';
  if (isMounted()) {
    classNameByTheme = theme === 'light' ? 'text-black' : 'text-white'
  }

  return (
    <svg
      height="1rem" className={`${classNameByTheme} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/>
    </svg>
  )
}