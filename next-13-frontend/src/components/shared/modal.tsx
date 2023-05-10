import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  children: JSX.Element | JSX.Element[];
  title?: string;
  width?: string;
};

const ModalPrimary = ({
  setShowModal,
  showModal,
  children,
  title,
  width = "max-w-md",
}: Props) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        onClose={() => setShowModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${width} relative  transform overflow-hidden rounded-2xl dark:bg-osc bg-white  text-left align-middle shadow-xl transition-all`}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                    onClick={() => setShowModal(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  {title && (
                    <div className="text-center mt-2">
                      <h1 className="text-xl font-semibold ">{title}</h1>
                    </div>
                  )}
                </Dialog.Title>
                <div className=" mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalPrimary;
