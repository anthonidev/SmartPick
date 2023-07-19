"use client";
import Button from "@/components/shared/Button";
import CompareImage from "@/components/shared/compare-image";
import InputImage from "@/components/shared/input-image";
import ArrowLoading from "@/components/ui/arrow-loading";
import InfoImage from "@/components/ui/info-image";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setImage } from "@/context/slice/gallery/gallerySlice";
import { removeBgService } from "@/context/slice/gallery/service";
import useFile from "@/lib/hooks/use-file";
import { saveAs } from "file-saver";
import { Session } from "next-auth/core/types";
import { useEffect } from "react";
import { AiFillPlusSquare, AiOutlineDownload } from "react-icons/ai";
import { FaImages } from "react-icons/fa";
import { toast } from "react-toastify";
type Props = {
  session: Session;
};

const RemoveBg = ({ session }: Props) => {
  const { handleUpload, uploadedFile, resetUpload } = useFile();
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
      dispatch(removeBgService(session.accessToken, uploadedFile));
    }
  };

  const resetRemoveBg = () => {
    dispatch(setImage(null));
    resetUpload();
  };

  return (
    <div>
      {uploadedFile && (
        <div className="my-10 flex justify-start space-x-5">
          <Button
            type="button"
            typeButton="reset"
            onClick={resetRemoveBg}
            Icon={AiFillPlusSquare}
          >
            Nueva imagen
          </Button>
          <Button
            type="button"
            typeButton="action"
            onClick={handleRemoveBg}
            Icon={FaImages}
          >
            Remover fondo
          </Button>
        </div>
      )}
      {uploadedFile && image ? (
        <div className="grid grid-cols-12  gap-5">
          <div className="mt-1 col-span-8    ">
            <CompareImage
              image1={URL.createObjectURL(uploadedFile)}
              image2={`${process.env.NEXT_PUBLIC_MEDIA_URL}${image.public_id}`}
            />
          </div>
          <div className="mt-1 overflow-hidden col-span-4   ">
            <div className="flex justify-center items-center h-full flex-col space-y-5">
              {uploadedFile && image && (
                <InfoImage image={image} uploadedFile={uploadedFile} />
              )}

              <Button
                type="button"
                typeButton="reset"
                onClick={handleDownload}
                Icon={AiOutlineDownload}
              >
                Descargar
              </Button>
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
              <ArrowLoading type="spokes" color="blue" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RemoveBg;
