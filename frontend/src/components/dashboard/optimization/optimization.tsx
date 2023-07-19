"use client";
import Button from "@/components/shared/Button";
import CompareImage from "@/components/shared/compare-image";
import InputImage from "@/components/shared/input-image";
import ArrowLoading from "@/components/ui/arrow-loading";
import InfoImage from "@/components/ui/info-image";
import RadioButtonNumber from "@/components/ui/radio-button-number";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setImage } from "@/context/slice/gallery/gallerySlice";
import { qualityService } from "@/context/slice/gallery/service";
import { quality } from "@/lib/data/filters";
import useFile from "@/lib/hooks/use-file";
import { saveAs } from "file-saver";
import { Session } from "next-auth/core/types";
import { useEffect, useState } from "react";
import {
  AiFillPlusSquare,
  AiOutlineDownload,
  AiOutlineFilter,
} from "react-icons/ai";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { toast } from "react-toastify";
type Props = {
  session: Session;
};

const Optimization = ({ session }: Props) => {
  const { handleUpload, uploadedFile, resetUpload } = useFile();
  const [selectedMailingLists, setSelectedMailingLists] = useState(quality[0]);
  useEffect(() => {
    if (image) {
      dispatch(setImage(null));
    }
  }, []);
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
      {uploadedFile && selectedMailingLists && (
        <div className="my-10 flex justify-start space-x-5">
          {image && (
            <Button
              type="button"
              onClick={() => resetFunction(true)}
              typeButton="reset"
              Icon={AiFillPlusSquare}
            >
              Nueva imagen
            </Button>
          )}
          {image && (
            <Button
              type="button"
              Icon={AiOutlineFilter}
              onClick={() => resetFunction(false)}
              typeButton="reset"
            >
              Aplicar otra calidad
            </Button>
          )}

          {!image && (
            <Button
              type="button"
              onClick={handleRemoveBg}
              typeButton="action"
              Icon={FaCompressArrowsAlt}
            >
              Optimizar imagen
            </Button>
          )}
        </div>
      )}
      {uploadedFile && image ? (
        <div className="grid grid-cols-12  gap-5">
          <div className="mt-1 col-span-8   ">
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
        <div className="flex space-x-5">
          <div className="w-1/2 ">
            <InputImage onUpload={handleUpload} uploadedFile={uploadedFile} />
            <div className="text-gray-800 dark:text-gray-100 mt-2">
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
                select={selectedMailingLists}
                setSelect={setSelectedMailingLists}
                values={quality}
                title="Calidad"
              />
            </div>
          )}

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

export default Optimization;
