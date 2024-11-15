import React from 'react';

export const DeleteIcon = ({
  testId = '',
  onClick,
}: {
  testId?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}) => {
  const style: React.CSSProperties = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    maxWidth: '18px',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 20"
      style={style}
      data-testid={testId}
      onClick={onClick}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14H5V6m2 0V4h10v2" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <rect x="5" y="6" width="14" height="14" rx="2" ry="2" />
    </svg>
  );
};
