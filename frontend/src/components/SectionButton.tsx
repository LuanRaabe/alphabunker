import { MouseEventHandler, ReactNode } from 'react';

interface SectionButtonProps {
  className?: string;
  title: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Archive: src/components/SectionButton.tsx
 *
 * Description: Menu button component
 *
 * Date: 2022/07/25
 *
 * Author: Luan
 */

export function SectionButton(props: SectionButtonProps) {
  return (
    <div className="flex flex-col items-center mx-1">
      <button
        className={`flex items-center justify-center h-10 w-14 text-btn-text rounded icon-light ${props.className}`}
        type="button"
        onClick={props.onClick}
      >
        {props.children}
      </button>
      <span className="text-xs">{props.title}</span>
    </div>
  );
}
