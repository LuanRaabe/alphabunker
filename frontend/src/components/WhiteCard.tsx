import { ReactNode } from 'react';

interface WhiteCardProps {
  childs?: JSX.Element[];
  icon: ReactNode;
  title: string;
  className?: string;
}

/**
 * Archive: src/pages/Profile.tsx
 *
 * Description: Profile page
 *
 * Date: 2022/07/28
 *
 * Author: Luan
 */

export function WhiteCard(props: WhiteCardProps) {
  return (
    <div
      className={`flex flex-col w-10/12 px-4 py-3 bg-white rounded-lg ${
        props.className ?? ''
      }`}
    >
      <div className="flex flex-row items-center mb-6">
        <span className="h-4 mr-3 text-icon-gold">{props.icon}</span>
        <span className="text-base text-header-gold">{props.title}</span>
      </div>
      <div className="flex flex-col">
        {props.childs?.map((child, index) => (
          <div
            className="flex flex-col w-11/12 mb-4 bg-body-light-100 text-input-placeholder"
            key={props.title + index}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
