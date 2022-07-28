import { useState } from 'react';

interface ValiadatorsType {
  validate: (value: string) => boolean;
  message: string;
}

interface InputProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (event: any) => void;
  mask?: (value: string) => string;
  onBlur?: () => void;
  validators?: ValiadatorsType[];
}

export function Input(props: InputProps) {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div className="relative flex flex-col">
      <input
        className="w-64 h-8 p-2 mb-5 rounded-md bg-input border-solid border-slate-600"
        type={props.type ?? 'text'}
        placeholder={props.placeholder ?? ''}
        required={!!props.required}
        value={props.value}
        onChange={(e) =>
          props.onChange(
            props.mask ? props.mask(e.target.value) : e.target.value,
          )
        }
        onBlur={() => {
          props.onBlur;
          props.validators &&
            props.validators.forEach(({ validate, message }) => {
              if (!validate(props.value)) setError(message);
              else setError(undefined);
            });
        }}
      />
      {error && (
        <span className="absolute top-8 left-2 text-xs font-bold text-input-error">
          {error}
        </span>
      )}
    </div>
  );
}
