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
import { BiImageAlt } from "react-icons/bi";
import { MdHeight } from "react-icons/md";
import { AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import dayjs from "dayjs";

type Props = {
  image: IImage;
};

const ImageItem = ({
  image: { format, id, name, public_id, url, height, width, bytes, created_at },
}: Props) => {
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
      <div className=" shadow-lg group border-2 hover:border-tertiary-50 rounded-xl overflow-hidden dark:border-gray-800 ">
        <div className="relative overflow-hidden" style={{ height: "400px" }}>
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${public_id}`}
            alt={name}
            width={500}
            height={300}
            className="transition-all duration-500 ease-in-out transform group-hover:scale-110 object-cover rounded-t-md "
          />
          {/* <div className="absolute top-5 left-5  flex flex-col space-y-2 justify-center items-center  tracking-wider">
            <span className=" bg-secondary-50 rounded-full text-xs px-5  text-white w-full text-center uppercase">
              Proyecto
            </span>
            <span className="  rounded-full text-xs px-5  text-white w-full text-center uppercase">
              state
            </span>
          </div> */}

          <div className="flex flex-col justify-center items-center absolute -bottom-16 rounded-t-sm group-hover:rounded-xl group-hover:-bottom-0 right-0 left-0 bg-gray-50 dark:bg-osc  rounded-b-md  group-hover:animate-fadeIn transition-all duration-500 ease-in-out">
            <p className="  text-gray-800 dark:text-gray-100 text-sm">
              {dayjs(created_at).format("DD/MM/YYYY")}
            </p>
            <p className="text-gray-800 dark:text-gray-100 text-xl font-extrabold  ">
              {name.slice(0, 20)}
            </p>
            <p className="text-gray-700 font-light  text-sm w-full text-center py-1 uppercase dark:text-gray-400">
              <BiImageAlt className="inline-block mr-2 text-primary-600 text-lg" />
              {format}
            </p>
            <div className="flex justify-between space-x-3">
              <p className="text-gray-700 font-light  text-sm w-full text-center py-1 dark:text-gray-400 ">
                <AiOutlineColumnHeight className="inline-block mr-2 text-primary-600 text-lg" />
                {height}px
              </p>
              <p className="text-gray-700 font-light  text-sm w-full text-center py-1 dark:text-gray-400">
                <AiOutlineColumnWidth className="inline-block mr-2 text-primary-600 text-lg" />
                {width}px
              </p>
            </div>

            <div className="w-full  justify-center items-center flex group-hover:flex opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
              <div className=" w-full mx-4 my-2  rounded-md  text-white uppercase  text-center py-3 ">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="absolute top-5 z-30 right-5 text-gray-400 bg-indigo-400 hover:bg-indigo-500 rounded-full hidden group-hover:flex items-center justify-center"
                >
                  <ArrowDownTrayIcon className=" h-8 w-8 text-white p-2 " />
                </button>
                <button
                  onClick={openModal}
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm "
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
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
