import { BytesToMegabytes } from "@/lib/utils/size";
import React from "react";

type Props = {
  image: IImage;
  uploadedFile: File;
};

const InfoImage = ({ image, uploadedFile }: Props) => {
  return (
    <div className="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Información de la imagen
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          Detalles de la imagen antes / después de procesar
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nombre</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {uploadedFile?.name} / {image.name}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Peso</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {BytesToMegabytes(uploadedFile?.size)} MB /{" "}
              {BytesToMegabytes(image.bytes)} MB
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Formato</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {uploadedFile.type} / {image.format}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Altura</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {image.height} px
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Ancho</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {image.width} px
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default InfoImage;
