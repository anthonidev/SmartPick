const crop: ICrop[] = [
  // { value: "thumb", name: "miniatura" },
  { value: "fill", name: "llenar" },
  { value: "crop", name: "recortar" },
  // { value: "fill_pad", name: "rellenar y recortar" },
  // { value: "fit", name: "ajustar" },
  // { value: "lfill", name: "rellenar a lo largo" },
  // { value: "limit", name: "limitar" },
  // { value: "mfit", name: "ajuste inteligente" },
  // { value: "mpad", name: "rellenar inteligente" },
  // { value: "pad", name: "rellenar" },
  // { value: "scale", name: "escalar" },
];

const gravity: ICrop[] = [
  { value: "auto", name: "auto" },
  { value: "east", name: "este" },
  { value: "north_west", name: "noroeste" },
];

const format: ICrop[] = [
  { value: "image/jpg", name: "jpg" },
  { value: "image/png", name: "png" },
  { value: "image/webp", name: "webp" },
  { value: "image/svg", name: "svg" },
  { value: "image/jpeg", name: "jpeg" },
];

export { crop, gravity, format };
