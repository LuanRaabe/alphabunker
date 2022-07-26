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
    <div className="flex flex-col items-center">
      <button
        className={`h-10 px-3 text-btn-text rounded ${props.className}`}
        type="button"
        onClick={props.onClick}
      >
        {props.children}
      </button>
      {props.title}
    </div>
  );
}
