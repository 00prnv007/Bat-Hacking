import type { SVGProps } from 'react';

export function BatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a9 9 0 0 0-9 9c0 3.9 2.5 7.2 6 8.5V14l-4 4h14l-4-4v5.5c3.5-1.3 6-4.6 6-8.5a9 9 0 0 0-9-9z" fill="currentColor" />
    </svg>
  );
}
