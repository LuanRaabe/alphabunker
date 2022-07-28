import { ReactNode } from 'react';

interface FormSubmitProps {
  submitForm: () => void;
  children: ReactNode;
}

export function FormSubmit(props: FormSubmitProps) {
  return (
    <form className="flex flex-col items-center" onSubmit={props.submitForm}>
      {props.children}
    </form>
  );
}
