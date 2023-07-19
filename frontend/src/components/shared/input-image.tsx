import { BytesToMegabytes } from "@/lib/utils/size";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TbWeight } from "react-icons/tb";

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
      className="border-2 border-dashed border-gray-400 dark:border-blue-500 rounded-lg  flex flex-col justify-center items-center mt-10 py-10"
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
          <span className="text-gray-600 dark:text-gray-200 text-sm my-4">
            <TbWeight className="inline mr-1 text-lg " />
            {BytesToMegabytes(uploadedFile.size)} MB
          </span>
        </>
      ) : isDragActive ? (
        <p className="text-gray-400  dark:text-white">
          Suelta la imagen aquí para subirla
        </p>
      ) : (
        <p className="text-gray-400  dark:text-white">
          Arrastra una imagen o haz click para seleccionar
        </p>
      )}

      <span>{uploadedFile?.name}</span>
    </div>
  );
}
