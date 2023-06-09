"use client";
import CompareImage from "@/components/shared/compare-image";
import InputImage from "@/components/shared/input-image";
import ArrowLoading from "@/components/ui/arrow-loading";
import ButtonDownload from "@/components/ui/button-download";
import InputNumber from "@/components/ui/input-number";
import RadioButtonNumber from "@/components/ui/radio-button-number";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setImage } from "@/context/slice/gallery/gallerySlice";
import { convertFormatService } from "@/context/slice/gallery/service";
import { format } from "@/lib/data/face-detection";
import useFile from "@/lib/hooks/use-file";
import { BytesToMegabytes } from "@/lib/utils/size";
import { saveAs } from "file-saver";
import { Session } from "next-auth/core/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  session: Session;
};

const ConvertImage = ({ session }: Props) => {
  const dispatch = useAppDispatch();
  const { image, loading } = useAppSelector((state) => state.gallery);
  const { handleUpload, uploadedFile, resetUpload } = useFile();
  const [selectFormat, setSelectFormat] = useState(format[0]);
  const [toSelectFormat, setToSelectFormat] = useState(format[0]);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [zoom, setZoom] = useState(1.0);

  useEffect(() => {
    if (image) {
      dispatch(setImage(null));
    }
  }, []);

  useEffect(() => {
    if (uploadedFile) {
      console.log(uploadedFile);
      setSelectFormat(
        format.find((item) => item.value === uploadedFile.type) || format[0]
      );
    }
  }, [uploadedFile]);

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
        convertFormatService(
          session.accessToken,
          uploadedFile,
          selectFormat.name.toUpperCase(),
          toSelectFormat.name.toUpperCase()
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
            <div className="text-gray-500">
              <span className="text-gray-800">Tipo de formato: </span>
              <span className="font-bold">{selectFormat.name}</span>
            </div>
            <div className="text-gray-500">
              <span className="text-gray-800">Peso antes: </span>
              <span className="font-bold">
                {BytesToMegabytes(uploadedFile.size, 4)} MB
              </span>
            </div>
            <div className="text-gray-500">
              <span className="text-gray-800">Peso despues: </span>
              <span className="font-bold">
                {BytesToMegabytes(image.bytes, 4)} MB
              </span>
            </div>

            <div className="flex justify-center items-center  flex-col space-y-5">
              <ButtonDownload handleDownload={handleDownload} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-5">
          <div className="w-1/2 ">
            <InputImage onUpload={handleUpload} uploadedFile={uploadedFile} />
            <div className="text-gray-800">
              Tipo de formato:{" "}
              <span className="font-bold">{selectFormat.name}</span>
            </div>
          </div>
          {!loading && (
            <div
              className="w-1/2 overflow-y-auto px-4"
              style={{ height: "500px" }}
            >
              <RadioButtonNumber<ICrop>
                select={selectFormat}
                setSelect={setSelectFormat}
                values={format}
                title="Formato"
                className="grid-cols-4 "
              />
              <RadioButtonNumber<ICrop>
                select={toSelectFormat}
                setSelect={setToSelectFormat}
                values={format}
                title="Formato de conversión"
                className="grid-cols-4 "
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

      {uploadedFile && selectFormat && (
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
              Aplicar otro formato
            </button>
          )}

          {!image && (
            <button
              type="button"
              onClick={handleRemoveBg}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Convertir
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ConvertImage;
