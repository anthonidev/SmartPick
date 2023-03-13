import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageUploaderProps = {
  onUpload: (file: File) => void;
};
export interface Accept {
  [key: string]: string[];
}

export default function InputImage({ onUpload }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
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
      {file ? (
        <Image
          src={URL.createObjectURL(file)}
          alt="Preview"
          width={500}
          height={500}
          className="object-cover"
        />
      ) : isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p className="text-gray-400 text-xl ">
          Seleccione o arrastre una imagen aquí
        </p>
      )}
    </div>
  );
}
