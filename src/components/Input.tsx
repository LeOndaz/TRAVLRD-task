import React, {HTMLProps, InputHTMLAttributes} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperProps?: HTMLProps<HTMLDivElement>;
}

const Input: React.FC<IProps> = ({wrapperProps, label, className, ...props}) => {
  return <div className="mb-4" {...wrapperProps}>
    {label &&
      <label className="block text-amber-300 text-sm font-bold mb-2" htmlFor={props.name}>
        {label}
      </label>
    }
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    />
  </div>
};
export default Input;
