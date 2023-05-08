import CompareImage from "@/components/image/CompareImage";
import InputImage from "@/components/image/InputImage";
import { filterService } from "@/context/slice/gallery/service";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import MainLayout from "../components/layout/MainLayout";
type Props = {};

const Filter = (props: Props) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { image, loading } = useAppSelector((state) => state.gallery);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleRemoveBg = () => {
    if (!uploadedFile) {
      return;
    }
    if (session?.accessToken) {
      dispatch(filterService(session.accessToken, uploadedFile));
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
      <h1 className="text-4xl  mt-10 text-gray-800 ">Filter Image</h1>
      <p className="text-gray-600 text-xl mt-5">
        Remove background from your images. You can upload an image and remove.
      </p>

      {uploadedFile && image ? (
        <div className="grid grid-cols-12 grid-rows-2 gap-5">
          <div className="mt-1 col-span-8  row-span-2 bg-gray-500  ">
            <CompareImage
              image1={URL.createObjectURL(uploadedFile)}
              image2={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.public_id}`}
            />
          </div>
          <div className="mt-1    overflow-hidden col-span-4  row-span-1 bg-gray-500">
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

Filter.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Smart Image" content="Content Page" maxWidth="w-full">
      {page}
    </MainLayout>
  );
};

export default Filter;
