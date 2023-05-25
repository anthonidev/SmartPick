"use client";
import CompareImage from "@/components/shared/compare-image";
import InputImage from "@/components/shared/input-image";
import RadioButtonNumber from "@/components/ui/radio-button-number";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setImage } from "@/context/slice/gallery/gallerySlice";
import { qualityService } from "@/context/slice/gallery/service";
import { quality } from "@/lib/data/filters";
import useFile from "@/lib/hooks/use-file";
import { BytesToMegabytes } from "@/lib/utils/size";
import { saveAs } from "file-saver";
import { Session } from "next-auth/core/types";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  session: Session;
};

const Optimization = ({ session }: Props) => {
  const { handleUpload, uploadedFile, resetUpload } = useFile();
  const [selectedMailingLists, setSelectedMailingLists] = useState(quality[0]);

  const { image, loading } = useAppSelector((state) => state.gallery);
  const dispatch = useAppDispatch();

  const handleDownload = () => {
    if (image) {
      saveAs(`${image.url}`, `${image.name}.png`);
    }
  };

  const handleRemoveBg = () => {
    if (!uploadedFile) {
      toast.error("Nececitas subir una imagen");
      return;
    }
    if (session?.accessToken) {
      dispatch(
        qualityService(
          session.accessToken,
          uploadedFile,
          selectedMailingLists.name
        )
      );
    }
  };

  const resetFunction = (all: boolean) => {
    if (all) {
      dispatch(setImage(null));
      resetUpload();
    } else {
      dispatch(setImage(null));
    }
  };

  return (
    <div>
      {uploadedFile && image ? (
        <div className="grid grid-cols-12 grid-rows-2 gap-5">
          <div className="mt-1 col-span-8  row-span-2  ">
            <CompareImage
              image1={URL.createObjectURL(uploadedFile)}
              image2={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.public_id}`}
            />
          </div>
          <div className="mt-1 overflow-hidden col-span-4  row-span-1 ">
            <div className="text-gray-500">
              <span className="text-gray-800">Calidad seleccionada: </span>
              <span className="font-bold">{selectedMailingLists.value}</span>
            </div>
            <div className="text-gray-500">
              <span className="text-gray-800">Peso antes: </span>
              <span className="font-bold">
                {BytesToMegabytes(uploadedFile.size)} MB
              </span>
            </div>
            <div className="text-gray-500">
              <span className="text-gray-800">Peso despues: </span>
              <span className="font-bold">
                {BytesToMegabytes(image.bytes)} MB
              </span>
            </div>

            <div className="flex justify-center items-center h-full">
              <button
                type="button"
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              >
                Descargar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-5">
          <div className="w-1/2 ">
            <InputImage onUpload={handleUpload} uploadedFile={uploadedFile} />
            <div className="text-gray-800">
              Calidad seleccionada:{" "}
              <span className="font-bold">{selectedMailingLists.value}</span>
            </div>
          </div>
          {!loading && (
            <div
              className="w-1/2 overflow-y-auto px-4"
              style={{ height: "500px" }}
            >
              <RadioButtonNumber
                selectedMailingLists={selectedMailingLists}
                setSelectedMailingLists={setSelectedMailingLists}
                qualities={quality}
              />
            </div>
          )}

          {loading && (
            <div className="flex justify-center mt-10 w-1/2">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      )}

      {uploadedFile && selectedMailingLists && (
        <div className="mt-10 flex justify-end space-x-5">
          {image && (
            <button
              type="button"
              onClick={() => resetFunction(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Restaurar
            </button>
          )}
          {image && (
            <button
              type="button"
              onClick={() => resetFunction(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Aplicar otro filtro
            </button>
          )}

          {!image && (
            <button
              type="button"
              onClick={handleRemoveBg}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Aplicar filtro
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Optimization;
