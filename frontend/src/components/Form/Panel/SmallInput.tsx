/**
 * Archive: src/components/Form/Panel/SmallInput.tsx
 *
 * Description: SmallInput component
 *
 * Date: 2022/07/30
 *
 * Author: Luan
 */

interface SmallInputProps {
  title: string;
  value: string | undefined;
  length?: number;
  onChange?: (event: any) => void;
  isDisabled?: boolean;
  mask?: (value: string) => string;
  validate?: (value: string) => boolean;
}

export function SmallInput(props: SmallInputProps) {
  return (
    <div className="flex flex-col">
      <input
        className="w-28 h-8 small-input text-input-text"
        disabled={props?.isDisabled}
        value={props.value}
        onChange={(e) =>
          props.onChange?.(props.mask?.(e.target.value) || e.target.value)
        }
        type="text"
        maxLength={props.length}
        minLength={props.length}
      />
      <span className="flex text-input-inactive text-[11px]">
        {props.title}
      </span>
    </div>
  );
}
