"use client";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { saveAs } from "file-saver";

type Props = {
  image: IImage;
};

const ImageItem = ({ image: { format, id, name, public_id, url } }: Props) => {
  const handleDownload = () => {
    saveAs(`${url}`, `${name}.png`);
  };
  return (
    <div className=" relative border-b border-r border-gray-200 p-4 sm:p-6 group">
      <button
        type="button"
        onClick={handleDownload}
        className="absolute top-5 z-30 right-5 text-gray-400 bg-indigo-400 hover:bg-indigo-500 rounded-full hidden group-hover:flex items-center justify-center"
      >
        <ArrowDownTrayIcon className=" h-8 w-8 text-white p-2 " />
      </button>

      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${public_id}`}
          alt={name}
          className=" object-cover "
          width={500}
          height={500}
        />
      </div>
      <div className="pb-4 pt-10 text-center">
        <div className="mt-3 flex flex-col items-center">
          <Link href={`/gallery/${id}`} className="mt-1 text-sm text-gray-500">
            {name}
          </Link>
        </div>
        <p className="mt-4 text-base font-medium text-gray-900">{format}</p>
      </div>
    </div>
  );
};

export default ImageItem;
