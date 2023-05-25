import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {};

const ArrowLoading = (props: Props) => {
  return (
    <div className="flex justify-center items-center animate-spin">
      <ArrowPathIcon className="h-20 w-20 text-gray-900" />
    </div>
  );
};

export default ArrowLoading;
