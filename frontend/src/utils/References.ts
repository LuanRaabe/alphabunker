import { ElementRef, useRef } from 'react';
import { Input } from '../components/Form/Input';

type InputHandler = ElementRef<typeof Input>;

/**
 * Archive: src/utils/References.ts
 *
 * Description: References function
 *
 * Date: 2022/07/30
 *
 * Author: Luan
 */

export function InputReferences() {
  const refs: any = {};
  type RefKey = keyof typeof refs;

  function getOrCrateRef(name: RefKey) {
    if (!refs[name]) {
      refs[name] = useRef<InputHandler>();
    }
    return refs[name as RefKey];
  }

  function setError(name: RefKey, errorMessage: string) {
    getOrCrateRef(name).current.triggerError(errorMessage);
  }

  function resetError(name: RefKey) {
    getOrCrateRef(name).current.resetError();
  }

  function runValidators(name: RefKey) {
    getOrCrateRef(name).current.runValidators();
  }

  return { getOrCrateRef, setError, resetError, runValidators };
}
