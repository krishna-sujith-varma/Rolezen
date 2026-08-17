import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const RolezenLogo: React.FC<IconProps> = ({ size = 28, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="#0F172A" />
    <path
      d="M8 20L14 14L18 18L24 10"
      stroke="#16A34A"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="10" r="2.5" fill="#22C55E" />
  </svg>
);

export const CareerFlowLogo = RolezenLogo;
