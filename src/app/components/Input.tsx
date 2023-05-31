import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  register: UseFormRegisterReturn<string>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}: InputProps) => {
  console.log(errors);

  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register}
          className={`
            form-input 
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            sm:text-sm
            sm:leading-6
            ${disabled && "opacity-50 cursor-default"}
            ${
              Boolean(errors[id])
                ? "focus:ring-rose-500 border-rose-500"
                : "ring-sky-600"
            }
          `}
        />
        <p className="text-xs text-rose-500 mt-1">
          {errors[id]?.message as string}
        </p>
      </div>
    </div>
  );
};

export default Input;
