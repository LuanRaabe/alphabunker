import { ReactNode } from 'react';

interface WhiteCardProps {
  icon: ReactNode;
  title: string;
  whithExtraIcon?: ReactNode;
  className?: string;
  childs?: JSX.Element[];
  blank?: boolean;
  children?: ReactNode;
}

/**
 * Archive: src/components/WhiteCard.tsx
 *
 * Description: WhiteCard component
 *
 * Date: 2022/07/28
 *
 * Author: Luan
 */

export function WhiteCard(props: WhiteCardProps) {
  return (
    <div
      className={`flex flex-col w-4/5 px-4 py-3 bg-white dark:bg-body-dark rounded-lg
      ${props.className ?? ''} dark:border-btn-secondary-base border items-center`}
    >
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-row items-center">
          <span className="mr-3 text-icon-gold text-left">{props.icon}</span>
          <span className="text-base text-header-gold text-left">{props.title}</span>
        </div>
        {props.whithExtraIcon && (
          <span className="text-base text-icon-dark-100">
            {props.whithExtraIcon}
          </span>
        )}{' '}
      </div>
      <div className="flex flex-col overflow-auto w-full items-center">
        {props.blank ? (
          <div className="flex flex-col items-center w-full">
            {props.children}
          </div>
        ) : (
          props.childs?.map((child, index) => (
            <div
              className="flex flex-col items-center w-11/12 mb-4 bg-body-light-100 dark:bg-body-dark dark:text-paragraph-light-100 text-input-placeholder"
              key={props.title + index}
            >
              {child}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
