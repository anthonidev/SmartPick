import { Dispatch, SetStateAction, useState } from "react";
import { RadioGroup } from "@headlessui/react";

type Props = {
  selectedMailingLists: IQuality;
  setSelectedMailingLists: Dispatch<SetStateAction<IQuality>>;
  qualities: IQuality[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RadioButtonNumber({
  selectedMailingLists,
  setSelectedMailingLists,
  qualities,
}: Props) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium leading-6 text-gray-900">Calidad</h2>
      </div>

      <RadioGroup
        value={selectedMailingLists}
        onChange={setSelectedMailingLists}
        className=""
      >
        <RadioGroup.Label className="sr-only">
          Seleccione una calidad
        </RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {qualities.map((option) => (
            <RadioGroup.Option
              key={option.name}
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
