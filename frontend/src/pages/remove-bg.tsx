import { ReactElement, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import CompareImage from "@/components/image/CompareImage";
import InputImage from "@/components/image/InputImage";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { removeBgService } from "@/context/slice/gallery/service";

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
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5">
      {}
      <h1 className="text-4xl font-bold text-center mt-10">
        Remove background from image
      </h1>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={handleRemoveBg}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Quitar fondo de la imagen
        </button>
      </div>

      {uploadedFile && image ? (
        <CompareImage
          image1={URL.createObjectURL(uploadedFile)}
          image2={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.public_id}`}
        />
      ) : (
        <div>
          <InputImage onUpload={handleUpload} />
          {/* <InputImage onUpload={handleUpload2} /> */}
        </div>
      )}

      {loading && (
        <div className="flex justify-center mt-10">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
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
