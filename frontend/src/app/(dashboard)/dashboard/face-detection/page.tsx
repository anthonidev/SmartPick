import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FaceDetection from "@/components/dashboard/face-detection/face-detection";
import { getServerSession } from "next-auth";

export default async function FaceDetectionPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return null;
  }

  return (
    <div className="px-4  text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ">
        Detección de rostros
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
        Puedes subir una imagen y detectar rostros
      </p>
      <FaceDetection session={session} />
    </div>
  );
}
