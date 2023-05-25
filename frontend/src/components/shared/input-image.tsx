import { BytesToMegabytes } from "@/lib/utils/size";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type ImageUploaderProps = {
  onUpload: (file: File) => void;
  uploadedFile: File | null;
};
export interface Accept {
  [key: string]: string[];
}

export default function InputImage({
  onUpload,
  uploadedFile,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles[0]);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 rounded-lg  flex flex-col justify-center items-center mt-10 py-10"
    >
      <input {...getInputProps()} />
      {uploadedFile ? (
        <>
          <Image
            src={URL.createObjectURL(uploadedFile)}
            alt="Preview"
            width={300}
            height={300}
            className="object-cover"
          />
          <span className="text-gray-600">
            peso de la imagen: {BytesToMegabytes(uploadedFile.size)} MB
          </span>
        </>
      ) : isDragActive ? (
        <p className="text-gray-400  ">Suelta la imagen aquí para subirla</p>
      ) : (
        <p className="text-gray-400  ">
          Arrastra una imagen o haz click para seleccionar
        </p>
      )}

      <span>{uploadedFile?.name}</span>
    </div>
  );
}
