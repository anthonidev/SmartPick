import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {
  handleDownload: () => void;
};

const ButtonDownload = ({ handleDownload }: Props) => {
  return (
    <button
      type="button"
      onClick={handleDownload}
      className="bg-celeste-500 hover:bg-celeste-700 text-white font-bold py-2 px-4 rounded flex space-x-4 justify-center items-center"
    >
      <ArrowDownTrayIcon
        className="h-5 w-5 shrink-0 text-white"
        aria-hidden="true"
      />
      <span>Descargar</span>
    </button>
  );
};

export default ButtonDownload;
