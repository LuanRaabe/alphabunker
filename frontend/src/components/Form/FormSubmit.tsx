import { ReactNode } from 'react';

interface FormSubmitProps {
  submitForm: () => void;
  children: ReactNode;
}

/**
 * Archive: src/components/Button.tsx
 *
 * Description: Button component
 *
 * Date: 2022/07/28
 *
 * Author: Luan
 */

export function FormSubmit(props: FormSubmitProps) {
  return (
    <form className="flex flex-col items-center" onSubmit={props.submitForm}>
      {props.children}
    </form>
  );
}
