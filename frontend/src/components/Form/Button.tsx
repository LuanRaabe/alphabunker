import { MouseEventHandler } from 'react';

interface PropTypes {
  className?: string;
  category: 'primary' | 'secondary' | 'cancel';
  label: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  tabIndex?: number;
}

/**
 * Archive: src/components/Button.tsx
 *
 * Description: Button component
 *
 * Date: 2022/07/22
 *
 * Author: Rey, Luan
 */

export const Button = ({
  className,
  label,
  type = 'button',
  onClick,
  category,
  isDisabled,
  tabIndex,
}: PropTypes) => (
  <button
    className={`w-64 h-8 flex items-center justify-center text-white rounded-md btn-${category} ${
      className ?? ''
    }`}
    type={type}
    onClick={onClick}
    disabled={isDisabled}
    tabIndex={tabIndex ?? 0}
  >
    {label}
  </button>
);
