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

interface InputProps {
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
}

interface InputHandle {
  triggerError: (name: string, error: string) => void;
  resetError: () => void;
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

  function resetError() {
    props.callback?.(false);
    setError(undefined);
  }

  useImperativeHandle(ref, () => ({
    triggerError(error: string) {
      console.log('chamou em', props.name);
      setError(error ? error : 'Ocorreu um erro aqui');
    },
    resetError() {
      setError(undefined);
    },
  }));

  return (
    <div className="relative flex flex-col">
      <input
        className="w-64 h-8 p-2 mb-5 rounded-md bg-input border-solid border-slate-600"
        type={props.type ?? 'text'}
        placeholder={props.placeholder ?? ''}
        required={!!props.required}
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
};

export const Input = forwardRef(InputRef);
