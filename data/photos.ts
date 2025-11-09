export type Photo = {
  id: string;
  fileName: string;
  src: string;
  alt: string;
};

const rawPhotos = [
  { fileName: "2O4A0071.jpg", alt: "Couple walking along a hillside path" },
  {
    fileName: "2O4A0091-mobile.JPG",
    alt: "Bride leaning on groom in mobile crop",
  },
  {
    fileName: "2O4A0091.jpg",
    alt: "Bride holding her bouquet while looking back",
  },
  {
    fileName: "2O4A0125-pc.jpg",
    alt: "Close-up portrait of the bride indoors",
  },
  { fileName: "2O4A0125.jpg", alt: "Bride looking out the window" },
  { fileName: "2O4A0174.jpg", alt: "Groom adjusting his suit jacket" },
  { fileName: "2O4A0200.jpg", alt: "Bride smiling while holding flowers" },
  { fileName: "2O4A0269.jpg", alt: "Couple embracing by the stairs" },
  { fileName: "2O4A0303.jpg", alt: "Couple sharing a drink outdoors" },
  { fileName: "2O4A9844.jpg", alt: "Bride lounging on a vintage sofa" },
  { fileName: "2O4A9869.jpg", alt: "Bride leaning against the wall" },
  { fileName: "2O4A9956.jpg", alt: "Couple smiling in matching outfits" },
  { fileName: "2O4A9965.jpg", alt: "Bride posing with bouquet by the window" },
  { fileName: "2O4A9985.jpg", alt: "Couple walking through a garden" },
] as const;

export const photos: Photo[] = rawPhotos.map(({ fileName, alt }) => ({
  id: fileName.replace(/\.[^.]+$/, ""),
  fileName,
  src: encodeURI(`/${fileName}`),
  alt,
}));
