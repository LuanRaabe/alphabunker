/**
 * Archive: src/components/Form/Panel/SmallInput.tsx
 *
 * Description: SmallInput component
 *
 * Date: 2022/07/30
 *
 * Author: Luan
 */

import { useEffect, useState } from 'react';
import { InputProps } from '../Input';

interface SmallInputProps extends Partial<InputProps> {
  title: string;
  value: string | undefined;
  length?: number;
  isDisabled?: boolean;
}

export function SmallInput(props: SmallInputProps) {
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setError(undefined);
  }, [props.value]);

  function runInputValidators() {
    props.validators?.forEach(({ validate, errorMessage }) => {
      if (!validate(props.value ?? '')) {
        setError(errorMessage);
        props.callback?.(true);
      } else setError(undefined);
    });
  }

  function handleChange(e: any) {
    const maskedvalue = props.mask?.(e.target.value) ?? e.target.value;
    props.onChange?.(maskedvalue);
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

  return (
    <div className="relative flex flex-col">
      <input
        className="w-28 h-8 small-input text-input-text"
        disabled={props?.isDisabled}
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
        type="text"
        maxLength={props.length}
        minLength={props.length}
        tabIndex={props.tabIndex ?? 0}
        autoFocus={props.autoFocus}
      />
      <span className="flex text-input-inactive text-[11px]">
        {!error ? (
          <>{props.title}</>
        ) : (
          <span className="mt-1 text-xs font-bold text-input-error">
            {error}
          </span>
        )}
      </span>
    </div>
  );
}
