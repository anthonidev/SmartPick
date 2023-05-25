"use client";
import CompareImage from "@/components/shared/compare-image";
import InputImage from "@/components/shared/input-image";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setImage } from "@/context/slice/gallery/gallerySlice";
import { removeBgService } from "@/context/slice/gallery/service";
import useFile from "@/lib/hooks/use-file";
import { saveAs } from "file-saver";
import { Session } from "next-auth/core/types";
import { toast } from "react-toastify";

type Props = {
  session: Session;
};

const RemoveBg = ({ session }: Props) => {
  const { handleUpload, uploadedFile, resetUpload } = useFile();
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
      dispatch(removeBgService(session.accessToken, uploadedFile));
    }
  };

  const resetRemoveBg = () => {
    dispatch(setImage(null));
    resetUpload();
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
        <div className="flex">
          <div className="w-1/2">
            <InputImage onUpload={handleUpload} uploadedFile={uploadedFile} />
          </div>
          {loading && (
            <div className="flex justify-center mt-10 w-1/2">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      )}

      {uploadedFile && (
        <div className="mt-10 flex justify-end space-x-5">
          <button
            type="button"
            onClick={resetRemoveBg}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Restaurar
          </button>
          <button
            type="button"
            onClick={handleRemoveBg}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Remover fondo
          </button>
        </div>
      )}
    </div>
  );
};

export default RemoveBg;
