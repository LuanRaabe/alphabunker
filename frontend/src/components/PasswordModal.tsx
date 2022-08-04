import { CaretDown, CaretUp } from 'phosphor-react';
import { useState } from 'react';

interface PasswordProps {
  password: string;
}

export function PasswordModal(props: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      {props.password && (
        <div className="fixed right-3 top-6 flex flex-col items-end">
          <div
            className="bg-slate-300 p-2 mb-2 rounded-full"
            onClick={() => togglePassword()}
          >
            {showPassword ? (
              <CaretUp weight="bold" className="w-6 h-6 text-icon-dark-200" />
            ) : (
              <CaretDown weight="bold" className="w-6 h-6 text-icon-dark-200" />
            )}
          </div>
          {showPassword && (
            <div className="text-2xl font-semibold text-brand-base bg-white rounded-md p-3">
              {props.password}
            </div>
          )}
        </div>
      )}
    </>
  );
}
