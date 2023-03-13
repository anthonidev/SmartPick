import CompareImage from "@/components/image/CompareImage";
import InputImage from "@/components/image/InputImage";
import MainLayout from "@/components/layout/MainLayout";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactElement, useState } from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFile2, setUploadedFile2] = useState<File | null>(null);
  const handleUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handleUpload2 = (file: File) => {
    setUploadedFile2(file);
  };
  return (
    <div className="max-w-7xl mx-auto px-5">
      <h1 className="text-4xl font-bold text-center mt-10">
        Remove background from image
      </h1>

      <div className="mt-10 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Quitar fondo de la imagen
        </button>
      </div>

      {uploadedFile && uploadedFile2 ? (
        <CompareImage
          image1={URL.createObjectURL(uploadedFile)}
          image2={URL.createObjectURL(uploadedFile2)}
        />
      ) : (
        <div>
          <InputImage onUpload={handleUpload} />
          <InputImage onUpload={handleUpload2} />
        </div>
      )}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Smart Image" content="Content Page" maxWidth="w-full">
      {page}
    </MainLayout>
  );
};

export default Home;
