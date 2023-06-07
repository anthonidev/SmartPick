import React from "react";

type Props = {
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  pattern?: string;
  type?: string;
};

const InputNumber = ({
  value,
  onChange,
  min = 200,
  max = 10000,
  step = 10,
  disabled = false,
  label = "Calidad",
  pattern = "^d*(.d{0,2})?$",
  type = "px",
}: Props) => {
  return (
    <div className="flex flex-col justify-start items-start my-5">
      <label
        htmlFor={label}
        className=" text-sm font-medium text-gray-700 w-20 flex"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="number"
          name={label}
          pattern={pattern}
          id={label}
          className="focus:ring-indigo-500  text-gray-800 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded py-1"
          placeholder={label}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{type}</span>
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
