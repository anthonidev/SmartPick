const crop: ICrop[] = [
  { value: "thumb", name: "miniatura" },
  { value: "fill", name: "rellenar" },
  { value: "crop", name: "recortar" },
  // { value: "scale", name: "escalar" },
];

const face: ICrop[] = [
  { value: "face", name: "uno" },
  { value: "faces", name: "varios" },
];
const format: ICrop[] = [
  // { value: "image/jpg", name: "jpg" },
  { value: "image/png", name: "png" },
  { value: "image/webp", name: "webp" },
  // { value: "image/svg", name: "svg" },
  { value: "image/jpeg", name: "jpeg" },
];
export { crop, face, format };
