import { BytesToMegabytes } from "@/lib/utils/size";
import React from "react";

type Props = {
  image: IImage;
  uploadedFile: File;
};

const InfoImage = ({ image, uploadedFile }: Props) => {
  return (
    <div className="max-w-2xl overflow-hidden bg-white dark:bg-osc shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Información de la imagen
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-300">
          Detalles de la imagen antes / después de procesar
        </p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Nombre
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 ">
              {uploadedFile?.name}
            </dd>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 ">
              {image.name}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white dark:bg-gray-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Peso
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 ">
              {BytesToMegabytes(uploadedFile?.size)} MB
            </dd>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 ">
              {BytesToMegabytes(image.bytes)} MB
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Formato
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 ">
              {uploadedFile.type}
            </dd>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 ">
              {image.format}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white dark:bg-gray-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Altura
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              {image.height} px
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 dark:bg-gray-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Ancho
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
              {image.width} px
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default InfoImage;
