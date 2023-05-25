import { useState } from "react";

const useFile = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
  };
  const resetUpload = () => {
    setUploadedFile(null);
  };

  return {
    handleUpload,
    uploadedFile,
    resetUpload,
  };
};

export default useFile;
