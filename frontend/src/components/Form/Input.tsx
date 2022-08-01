import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

interface ValidatorsType {
  validate: (value: string) => boolean;
  errorMessage: string;
}

export interface InputProps {
  type?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (event: any) => void;
  mask?: (value: string) => string;
  onFocus?: () => void;
  onBlur?: () => void;
  validators?: ValidatorsType[];
  callback?: (value: boolean) => void;
  tabIndex?: number;
  autoFocus?: boolean;
}

export interface InputHandle {
  triggerError: (error: string) => void;
  resetError: () => void;
  runValidators: () => void;
}
/**
 * Archive: src/components/Form/Input.tsx
 *
 * Description: Input component
 *
 * Date: 2022/07/28
 *
 * Author: Luan
 */

const InputRef: ForwardRefRenderFunction<InputHandle, InputProps> = (
  props: InputProps,
  ref: any,
) => {
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

  function handleChange(e: any) {
    const maskedvalue = props.mask?.(e.target.value) ?? e.target.value;
    props.onChange(maskedvalue);
  }

  function handleBlur() {
    props.onBlur;
    runInputValidators();
  }

  function handleFocus() {
    props.onFocus;
    resetError();
  }

  function resetError() {
    props.callback?.(false);
    setError(undefined);
  }

  useImperativeHandle(ref, () => ({
    triggerError(error: string) {
      setError(error ? error : 'Ocorreu um erro aqui');
    },
    resetError() {
      setError(undefined);
    },
    runValidators() {
      runInputValidators();
    },
  }));

  return (
    <div className="relative flex flex-col">
      <input
        className="w-64 h-8 p-2 mb-5 rounded-md bg-input border-solid border-slate-600"
        type={props.type ?? 'text'}
        placeholder={props.placeholder ?? ''}
        required={!!props.required}
        value={props.value}
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={() => {
          handleBlur();
        }}
        onFocus={() => {
          handleFocus();
        }}
        tabIndex={props.tabIndex ?? 0}
        autoFocus={props.autoFocus}
      />
      {error && (
        <span className="absolute top-8 left-2 text-xs font-bold text-input-error">
          {error}
        </span>
      )}
    </div>
  );
};

export const Input = forwardRef(InputRef);
