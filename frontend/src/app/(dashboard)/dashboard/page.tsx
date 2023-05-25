import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
const features = [
  {
    name: "Remover fondo",
    description:
      "Remueve el fondo de tus imagenes de manera facil y rapida, solo debes subir tu imagen y listo.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Filtros",
    description:
      "Aplica filtros a tus imagenes de manera facil y rapida, solo debes subir tu imagen y listo.",
    icon: LockClosedIcon,
  },
  {
    name: "Optimizacion de imagenes",
    description:
      "Reduce el peso de tus imagenes de manera facil y rapida, solo debes subir tu imagen y listo.",
    icon: ArrowPathIcon,
  },
  {
    name: "Detectar rostros",
    description:
      "Detecta rostros en tus imagenes de manera facil y rapida, solo debes subir tu imagen y listo.",
    icon: FingerPrintIcon,
  },
];
export default async function DashboardMain() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  if (!session.accessToken) {
    return null;
  }
  return (
    <div className="bg-white py-5 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Facil de usar
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Todo lo que necesitas para tu editar imagenes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Con esta herramienta podras editar tus imagenes de manera facil y
            rapida, solo debes subir tu imagen y listo.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
