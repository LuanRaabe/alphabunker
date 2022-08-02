import { ReactNode } from 'react';

interface FormSubmitProps {
  submitForm: () => void;
  children: ReactNode;
}

/**
 * Archive: src/components/FormSubmit.tsx
 *
 * Description: FormSubmit component
 *
 * Date: 2022/07/28
 *
 * Author: Luan
 */

export function FormSubmit(props: FormSubmitProps) {
  return (
    <form
      className="flex flex-col items-center justify-center w-full h-full"
      onSubmit={props.submitForm}
    >
      {props.children}
    </form>
  );
}
