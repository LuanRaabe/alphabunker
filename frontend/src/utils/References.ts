import { ElementRef, useRef } from 'react';
import { Input } from '../components/Form/Input';

type InputHandler = ElementRef<typeof Input>;
export function InputReferences() {
  const refs: any = {};

  function getOrCrateRef(name: keyof typeof refs) {
    if (!refs[name]) {
      refs[name] = useRef<InputHandler>();
    }
    return refs[name as keyof typeof refs];
  }

  function setError(name: keyof typeof refs, errorMessage: string) {
    getOrCrateRef(name).current.triggerError(errorMessage);
  }

  function resetError(name: keyof typeof refs) {
    getOrCrateRef(name).current.resetError();
  }

  return { getOrCrateRef, setError, resetError };
}
