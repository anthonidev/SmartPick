import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ImageItem from "@/components/dashboard/image-item";
import SkeletonMainGrid from "@/components/ui/skeleton-grid";
import { getGallery } from "@/context/actions/get-gallery";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (!session.accessToken) {
    return null;
  }

  const gallery = getGallery(session.accessToken);

  return (
    <div className="flex flex-col  ">
      <div className="px-4  text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-10">
          Galeria
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
          Podras ver todas las imagenes que has subido a Imagix
        </p>
      </div>
      <Suspense fallback={<SkeletonMainGrid />}>
        {/* @ts-expect-error Server Component */}

        <GalleryList promise={gallery} />
      </Suspense>
    </div>
  );
}

async function GalleryList({ promise }: { promise: Promise<IImage[]> }) {
  // Wait for the albums promise to resolve
  const gallery = await promise;
  console.log(gallery);

  return (
    <>
      <div className="-mx-px grid grid-cols-2 gap-8  sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((item) => (
          <ImageItem image={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
