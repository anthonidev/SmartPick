"use client";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { saveAs } from "file-saver";
import useModal from "@/lib/hooks/use-modal";
import ModalPrimary from "../shared/modal";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import HttpImage from "@/lib/utils/HttpImage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  image: IImage;
};

const ImageItem = ({ image: { format, id, name, public_id, url } }: Props) => {
  const handleDownload = () => {
    saveAs(`${url}`, `${name}.png`);
  };

  const { closeModal, isOpen, openModal } = useModal();
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const { refresh } = useRouter();

  const confirmDeleteLand = async () => {
    setLoading(true);
    if (!id) return;
    if (!data?.accessToken) return;
    console.log(data.accessToken);

    await HttpImage.delete(`/api/image/gallery/${id}/delete/`, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        toast.success("Imagen eliminada correctamente");
        refresh();
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
  };

  const cancelDelete = () => {
    closeModal();
  };

  return (
    <>
      <div className=" relative border-b border-r border-gray-200 p-4 sm:p-6 group">
        <button
          type="button"
          onClick={handleDownload}
          className="absolute top-5 z-30 right-5 text-gray-400 bg-indigo-400 hover:bg-indigo-500 rounded-full hidden group-hover:flex items-center justify-center"
        >
          <ArrowDownTrayIcon className=" h-8 w-8 text-white p-2 " />
        </button>
        <button
          className="absolute top-5 z-30 left-5  bg-white  rounded-full hidden group-hover:flex items-center justify-center"
          onClick={openModal}
        >
          <XCircleIcon className="h-8 w-8 text-red-500" />
        </button>

        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200">
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${public_id}`}
            alt={name}
            className=" object-cover "
            width={500}
            height={500}
          />
        </div>
        <div className="pb-4 pt-10 text-center">
          <div className="mt-3 flex flex-col items-center">
            <span className="mt-1 text-sm text-gray-500">{name}</span>
          </div>
          <p className="mt-4 text-base font-medium text-gray-900">{format}</p>
        </div>
      </div>
      <ModalPrimary
        showModal={isOpen}
        setShowModal={closeModal}
        width="max-w-xl"
      >
        <div className=" rounded-md p-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Eliminar Imagen {name}
          </h1>
          <p className="text-gray-900 dark:text-gray-100">
            ¿Está seguro que desea eliminar esta imagen? Esta acción no se puede
            deshacer.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={cancelDelete}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
              onClick={confirmDeleteLand}
              type="button"
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </ModalPrimary>
    </>
  );
};

export default ImageItem;
