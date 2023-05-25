import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-gray-50">
      <div className="  w-48 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center animate-spin">
          <ArrowPathIcon className="h-20 w-20 text-gray-900" />
        </div>
      </div>
    </div>
  );
}
