import { useEffect, useState } from 'react';

interface ValidatorsType {
  validate: (value: string) => boolean;
  errorMessage: string;
}

interface InputProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (event: any) => void;
  mask?: (value: string) => string;
  onFocus?: () => void;
  onBlur?: () => void;
  validators?: ValidatorsType[];
  callback?: (value: boolean) => void;
}

export function Input(props: InputProps) {
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setError(undefined);
  }, [props.value]);

  function runInputValidators() {
    props.validators?.forEach(({ validate, errorMessage }) => {
      if (!validate(props.value)) {
        setError(errorMessage);
        props.callback?.(true);
      } else setError(undefined);
    });
  }

  function resetError() {
    props.callback?.(false);
    setError(undefined);
  }

  return (
    <div className="relative flex flex-col">
      <input
        className="w-64 h-8 p-2 mb-5 rounded-md bg-input border-solid border-slate-600"
        type={props.type ?? 'text'}
        placeholder={props.placeholder ?? ''}
        required={!!props.required}
        value={props.value}
        onChange={(e) =>
          props.onChange(props.mask?.(e.target.value) || e.target.value)
        }
        onBlur={() => {
          props.onBlur;
          runInputValidators();
        }}
        onFocus={() => {
          props.onFocus;
          resetError();
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
