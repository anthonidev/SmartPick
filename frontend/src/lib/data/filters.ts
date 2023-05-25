const filters: IFilter[] = [
  {
    id: 1,
    title: "al_dente",
    value: "art:al_dente",
    description:
      "Un filtro que agrega un toque de encanto vintage con tonos cálidos y un sutil viñeteado.",
  },
  {
    id: 2,
    title: "athena",
    value: "art:athena",
    description:
      "Un filtro que brinda una apariencia suave y etérea con colores tenues y una atmósfera de ensueño.",
  },
  {
    id: 3,
    title: "audrey",
    value: "art:audrey",
    description:
      "Un filtro inspirado en la fotografía clásica en blanco y negro, evocando elegancia y belleza atemporal.",
  },
  {
    id: 4,
    title: "aurora",
    value: "art:aurora",
    description:
      "Un filtro que agrega un efecto colorido y vibrante de aurora boreal a tus imágenes.",
  },
  {
    id: 5,
    title: "daguerre",
    value: "art:daguerre",
    description:
      "Un filtro que replica el aspecto de las fotografías daguerrotipo, con tonos ricos y estética antigua.",
  },
  {
    id: 6,
    title: "eucalyptus",
    value: "art:eucalyptus",
    description:
      "Un filtro que infunde un tinte verde fresco y refrescante, evocando las hojas de eucalipto.",
  },
  {
    id: 7,
    title: "fes",
    value: "art:fes",
    description:
      "Un filtro inspirado en los colores cálidos y vibrantes que se encuentran en los mercados marroquíes, creando una atmósfera exótica.",
  },
  {
    id: 8,
    title: "frost",
    value: "art:frost",
    description:
      "Un filtro que agrega un efecto helado y gélido, con tonos frescos y un toque de magia invernal.",
  },
  {
    id: 9,
    title: "hairspray",
    value: "art:hairspray",
    description:
      "Un filtro que brinda una apariencia retro y nostálgica, reminiscente de fotografías antiguas.",
  },
  {
    id: 10,
    title: "hokusai",
    value: "art:hokusai",
    description:
      "Un filtro inspirado en el icónico artista japonés Hokusai, con colores audaces y pinceladas artísticas.",
  },
  {
    id: 11,
    title: "incognito",
    value: "art:incognito",
    description:
      "Un filtro que agrega un ambiente misterioso y secreto, con sombras oscuras y tonos suaves.",
  },
  {
    id: 12,
    title: "linen",
    value: "art:linen",
    description:
      "Un filtro que imita la textura y calidez de la tela de lino, creando una sensación acogedora y rústica.",
  },
  {
    id: 13,
    title: "peacock",
    value: "art:peacock",
    description:
      "Un filtro que realza los colores y agrega un toque de belleza iridiscente, reminiscente de las plumas de un pavo real.",
  },
  {
    id: 14,
    title: "primavera",
    value: "art:primavera",
    description:
      "Un filtro que trae la frescura y los colores vibrantes de la primavera, agregando una atmósfera animada y alegre.",
  },
  {
    id: 15,
    title: "quartz",
    value: "art:quartz",
    description:
      "Un filtro que crea un ambiente suave y onírico con tonos pastel y un toque de magia.",
  },
  {
    id: 16,
    title: "red_rock",
    value: "art:red_rock",
    description:
      "Un filtro que agrega calidez y realza los tonos rojos, dando una apariencia similar a las rocas rojas del desierto.",
  },
  {
    id: 17,
    title: "refresh",
    value: "art:refresh",
    description:
      "Un filtro que brinda un aspecto fresco y revitalizante con colores vibrantes y una atmósfera enérgica.",
  },
  {
    id: 18,
    title: "sizzle",
    value: "art:sizzle",
    description:
      "Un filtro que agrega un efecto ardiente y enérgico, con colores intensos y una apariencia llamativa.",
  },
  {
    id: 19,
    title: "sonnet",
    value: "art:sonnet",
    description:
      "Un filtro que evoca la elegancia y el romanticismo de un soneto, con tonos suaves y una estética poética.",
  },
  {
    id: 20,
    title: "ukulele",
    value: "art:ukulele",
    description:
      "Un filtro que añade un toque alegre y juguetón, con colores brillantes y una sensación veraniega.",
  },
  {
    id: 21,
    title: "zorro",
    value: "art:zorro",
    description:
      "Un filtro que agrega un aspecto audaz y enigmático, con tonos oscuros y un toque de misterio.",
  },
  {
    id: 22,
    title: "cartoonify",
    value: "cartoonify",
    description:
      "Un filtro que transforma tus imágenes en un estilo de dibujo animado, con colores vibrantes y contornos nítidos.",
  },
  {
    id: 23,
    title: "sepia",
    value: "sepia",
    description:
      "Un filtro que transforma tus imágenes en tonos sepia, dándoles un aspecto nostálgico y vintage.",
  },
  {
    id: 24,
    title: "vignette",
    value: "vignette",
    description:
      "Un filtro que agrega un efecto de viñeteado oscureciendo los bordes de la imagen, enfocando la atención en el centro.",
  },
];

const quality: IQuality[] = [
  { name: "10", value: 10 },
  { name: "20", value: 20 },
  { name: "30", value: 30 },
  { name: "40", value: 40 },
  { name: "50", value: 50 },
  { name: "60", value: 60 },
  { name: "70", value: 70 },
  { name: "80", value: 80 },
  { name: "90", value: 90 },
  { name: "100", value: 100 },
  // { name: "auto", value: 100 },
];
export { filters, quality };
