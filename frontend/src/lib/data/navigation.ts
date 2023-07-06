import {
  HomeIcon,
  PhotoIcon,
  ClipboardDocumentCheckIcon,
  FunnelIcon,
  ArrowsPointingInIcon,
  FaceSmileIcon,
  ScissorsIcon,
  SwatchIcon,
} from "@heroicons/react/24/solid";

const navigation = [
  { name: "Inicio", href: undefined, icon: HomeIcon },
  { name: "Galería", href: "gallery", icon: PhotoIcon },
  {
    name: "Remover Fondo",
    href: "remove-bg",
    icon: ClipboardDocumentCheckIcon,
  },
  { name: "filtros", href: "filter", icon: FunnelIcon },
  { name: "Optimización", href: "optimization", icon: ArrowsPointingInIcon },
  {
    name: "Detectar rostro",
    href: "face-detection",
    icon: FaceSmileIcon,
  },
  {
    name: "tamaño y recorte",
    href: "size-crop",
    icon: ScissorsIcon,
  },
  {
    name: "Convertidor",
    href: "convert",
    icon: SwatchIcon,
  },
];

export { navigation };
