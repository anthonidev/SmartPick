import { RadioGroup } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
interface Option {
  name: string;
  value: string | number;
}

type Props<T extends Option> = {
  select: T;
  setSelect: Dispatch<SetStateAction<T>>;
  values: T[];
  title: string;
  className?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RadioButtonNumber<T extends Option>({
  select,
  setSelect,
  values,
  title,
  className = "grid-cols-3 sm:grid-cols-6",
}: Props<T>) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium leading-6 text-gray-900">{title}</h2>
      </div>

      <RadioGroup value={select} onChange={setSelect}>
        <RadioGroup.Label className="sr-only">
          Seleccione una {title}
        </RadioGroup.Label>
        <div className={`grid gap-3 ${className}`}>
          {values.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  true
                    ? "cursor-pointer focus:outline-none"
                    : "cursor-not-allowed opacity-25",
                  active ? "ring-2 ring-indigo-600 ring-offset-2" : "",
                  checked
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                  "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1"
                )
              }
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
