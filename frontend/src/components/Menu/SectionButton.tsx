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
        className={`flex items-center justify-center h-[46px] w-[54px] mb-2 cursor-pointer text-btn-text rounded icon-light ${props.className}`}
        type="button"
        onClick={props.onClick}
      >
        {props.children}
      </button>
      <span className="text-xs cursor-pointer">{props.title}</span>
    </div>
  );
}
