import ImageItem from "@/components/image/ImageItem";
import MainLayout from "@/components/layout/MainLayout";
import { getImageService } from "@/context/slice/gallery/service";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const ImageEdit = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const { image } = useAppSelector((state) => state.gallery);
  useEffect(() => {
    if (image && image.public_id === id) return;
    if (id && session?.accessToken) {
      dispatch(getImageService(session.accessToken, id as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1>ImageEdit</h1>
      {image && (
        <Image src={image.url} width={"500"} height={"500"} alt={image.name} />
      )}
    </div>
  );
};

ImageEdit.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Smart Image" content="Content Page" maxWidth="w-full">
      {page}
    </MainLayout>
  );
};
export default ImageEdit;
