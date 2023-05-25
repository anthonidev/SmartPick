import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

type Props = {
  children: React.ReactNode;
  content: React.ReactNode | string;
  align: "start" | "center" | "end";
};

const popover = ({ align, children, content }: Props) => {
  return (
    <div className="  w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
            ${open ? "" : "text-opacity-90"}
            group inline-flex items-center rounded-md  text-base font-medium text-white hover:text-opacity-100 focus:outline-none`}
            >
              {children}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute  z-10 mt-3  max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className=" bg-white  ">{content}</div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default popover;
