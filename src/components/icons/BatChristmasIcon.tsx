import type { SVGProps } from 'react';

export function BatChristmasIcon(props: SVGProps<SVGSVGElement>) {
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
      {/* Santa Hat */}
      <path d="M12 2 L8 5 L16 5 z" fill="#D92E2E" stroke="none" />
      <path d="M8 5 L16 5" stroke="white" strokeWidth="1.5" />
      <circle cx="16.5" cy="4.5" r="1.5" fill="white" stroke="none" />
      
      {/* Bat Symbol */}
      <path d="M12 6c-3 0-6 2-6 2s1.5 6 6 6 6-6 6-6-3-2-6-2z" fill="currentColor" />
      <path d="M12 14c-6 0-7 4-7 4h14s-1-4-7-4z" fill="currentColor" />
    </svg>
  );
}
