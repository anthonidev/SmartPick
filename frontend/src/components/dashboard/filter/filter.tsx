"use client";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import useFile from "@/lib/hooks/use-file";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { Session } from "next-auth/core/types";
import { filterService } from "@/context/slice/gallery/service";
import CompareImage from "@/components/shared/compare-image";
import InputImage from "@/components/shared/input-image";
import { setImage } from "@/context/slice/gallery/gallerySlice";
import RadioButton from "@/components/ui/radio-button";
import { filters } from "@/lib/data/filters";
import InfoImage from "@/components/ui/info-image";
import ButtonDownload from "@/components/ui/button-download";
import ArrowLoading from "@/components/ui/arrow-loading";

type Props = {
  session: Session;
};

const Filter = ({ session }: Props) => {
  const { handleUpload, uploadedFile, resetUpload } = useFile();
  const [selectedMailingLists, setSelectedMailingLists] = useState(filters[0]);

  const { image, loading } = useAppSelector((state) => state.gallery);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (image) {
      dispatch(setImage(null));
    }
  }, []);
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
        filterService(
          session.accessToken,
          uploadedFile,
          selectedMailingLists.value
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
              image2={`${process.env.NEXT_PUBLIC_MEDIA_URL}${image.public_id}`}
            />
          </div>
          <div className="mt-1 overflow-hidden col-span-4  row-span-1 ">
            <div className="flex justify-center items-center h-full flex-col space-y-5">
              {uploadedFile && image && (
                <InfoImage image={image} uploadedFile={uploadedFile} />
              )}

              <ButtonDownload handleDownload={handleDownload} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-5">
          <div className="w-1/2 ">
            <InputImage onUpload={handleUpload} uploadedFile={uploadedFile} />
            <div className="text-gray-800">
              Filtro seleccionado:{" "}
              <span className="font-bold">{selectedMailingLists.title}</span>
            </div>
          </div>
          {!loading && (
            <div
              className="w-1/2 overflow-y-auto px-4"
              style={{ height: "500px" }}
            >
              <RadioButton
                selectedMailingLists={selectedMailingLists}
                setSelectedMailingLists={setSelectedMailingLists}
                filters={filters}
              />
            </div>
          )}

          {loading && (
            <div className="flex justify-center mt-10 w-1/2">
              <ArrowLoading />
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

export default Filter;
