import { ReactElement, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import CompareImage from "@/components/image/CompareImage";
import InputImage from "@/components/image/InputImage";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { removeBgService } from "@/context/slice/gallery/service";
import { toast } from "react-toastify";
import Link from "next/link";
import { saveAs } from "file-saver";
type Props = {};

const RemoveBg = (props: Props) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { image, loading } = useAppSelector((state) => state.gallery);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleRemoveBg = () => {
    if (!uploadedFile) {
      console.log("No hay imagen");
      return;
    }
    console.log("Remover fondo");
    if (session?.accessToken) {
      dispatch(removeBgService(session.accessToken, uploadedFile));
    } else {
      toast.error("Need to login");
    }
  };

  const handleDownload = () => {
    if (image) {
      saveAs(`${image.url}`, `${image.name}.png`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5">
      {}
      <h1 className="text-4xl  mt-10 text-gray-800 ">Remove background</h1>
      <p className="text-gray-600 text-xl mt-5">
        Remove background from your images. You can upload an image and remove.
      </p>

      {uploadedFile && image ? (
        <div className="flex">
          <div
            className="mt-1  w-1/2  border overflow-hidden"
            style={{ height: "500px" }}
          >
            <CompareImage
              image1={URL.createObjectURL(uploadedFile)}
              image2={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.public_id}`}
            />
          </div>
          <div className="mt-1  w-1/2   overflow-hidden">
            <div className="flex justify-center space-x-5">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Share
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                download
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-1/2">
            <InputImage onUpload={handleUpload} />
          </div>
          {loading && (
            <div className="flex justify-center mt-10 w-1/2">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      )}

      {uploadedFile && (
        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={handleRemoveBg}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove background
          </button>
        </div>
      )}
    </div>
  );
};

RemoveBg.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Smart Image" content="Content Page" maxWidth="w-full">
      {page}
    </MainLayout>
  );
};

export default RemoveBg;
