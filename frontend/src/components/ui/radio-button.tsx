import { Dispatch, SetStateAction, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import TooltipInfo from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  selectedMailingLists: IFilter;
  setSelectedMailingLists: Dispatch<SetStateAction<IFilter>>;
  filters: IFilter[];
};
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function RadioButton({
  selectedMailingLists,
  setSelectedMailingLists,
  filters,
}: Props) {
  return (
    <RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists}>
      <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
        Filtros
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 sm:gap-x-4">
        {filters.map((mailingList) => (
          <RadioGroup.Option
            key={mailingList.id}
            value={mailingList}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "border-indigo-600 ring-2 ring-indigo-600" : "",
                "relative flex cursor-pointer rounded-lg border bg-white dark:bg-osc-300 p-4 shadow-sm focus:outline-none group"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="div"
                      className=" text-sm flex space-x-2 items-center  font-medium text-gray-900 dark:text-white uppercase"
                    >
                      <span>{mailingList.title}</span>

                      <TooltipInfo
                        transitionName="rc-tooltip-zoom"
                        placement="top"
                        trigger={["hover"]}
                        overlay={
                          <div
                            className="flex flex-col items-center justify-center"
                            style={{
                              width: 150,
                              textAlign: "center",
                            }}
                          >
                            <span>{mailingList.description}</span>
                          </div>
                        }
                      >
                        <AiOutlineExclamationCircle />
                      </TooltipInfo>
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-indigo-600"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-indigo-600" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
