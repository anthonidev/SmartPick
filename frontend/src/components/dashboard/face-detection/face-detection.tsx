"use client";
import Button from "@/components/shared/Button";
import CompareImage from "@/components/shared/compare-image";
import InputImage from "@/components/shared/input-image";
import ArrowLoading from "@/components/ui/arrow-loading";
import ButtonDownload from "@/components/ui/button-download";
import InfoImage from "@/components/ui/info-image";
import InputNumber from "@/components/ui/input-number";
import RadioButtonNumber from "@/components/ui/radio-button-number";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setImage } from "@/context/slice/gallery/gallerySlice";
import { faceDetectionService } from "@/context/slice/gallery/service";
import { crop, face } from "@/lib/data/face-detection";
import useFile from "@/lib/hooks/use-file";
import { BytesToMegabytes } from "@/lib/utils/size";
import { saveAs } from "file-saver";
import { Session } from "next-auth/core/types";
import { useEffect, useState } from "react";
import {
  AiFillPlusSquare,
  AiOutlineDownload,
  AiOutlineFilter,
} from "react-icons/ai";
import { FaImages } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {
  session: Session;
};

const FaceDetection = ({ session }: Props) => {
  const dispatch = useAppDispatch();
  const { image, loading } = useAppSelector((state) => state.gallery);
  const { handleUpload, uploadedFile, resetUpload } = useFile();
  const [selectedMailingLists, setSelectedMailingLists] = useState(crop[0]);
  const [selectedFace, setSelectedFace] = useState(face[0]);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [zoom, setZoom] = useState(1.0);

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
        faceDetectionService(
          session.accessToken,
          uploadedFile,
          height,
          width,
          selectedMailingLists.value,
          zoom,
          selectedFace.value
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
              Aplicar otro recorte
            </Button>
          )}

          {!image && (
            <Button
              type="button"
              onClick={handleRemoveBg}
              typeButton="action"
              Icon={FaImages}
            >
              Detectar rostro
            </Button>
          )}
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
          <div className="mt-1 overflow-hidden col-span-4  ">
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
              Tipo de recorte:{" "}
              <span className="font-bold">{selectedMailingLists.name}</span>
            </div>
          </div>
          {!loading && (
            <div
              className="w-1/2 overflow-y-auto px-4"
              style={{ height: "500px" }}
            >
              <RadioButtonNumber<ICrop>
                select={selectedMailingLists}
                setSelect={setSelectedMailingLists}
                values={crop}
                title="Tipo de recorte"
                className="grid-cols-2 sm:grid-cols-3"
              />
              <RadioButtonNumber<ICrop>
                select={selectedFace}
                setSelect={setSelectedFace}
                values={face}
                title="Cantidad de rostros"
                className="grid-cols-2 "
              />
              <div className="flex space-x-5">
                <InputNumber value={height} onChange={setHeight} label="Alto" />
                <InputNumber value={width} onChange={setWidth} label="Ancho" />
                <InputNumber
                  value={zoom}
                  onChange={setZoom}
                  label="Zoom"
                  step={0.1}
                  min={0}
                  pattern="^\d*(\.\d{0,2})?$"
                  type=""
                />
              </div>
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

export default FaceDetection;
