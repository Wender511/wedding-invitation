export type Photo = {
  id: string;
  fileName: string;
  src: string;
  alt: string;
};

const rawPhotos = [
  { fileName: 'album/2O4A0071.jpg', alt: 'Couple walking along a hillside path' },
  {
    fileName: 'album/2O4A0091.jpg',
    alt: 'Bride leaning on groom in mobile crop'
  },
  { fileName: 'album/2O4A0125.jpg', alt: 'Bride looking out the window' },
  { fileName: 'album/2O4A0269.jpg', alt: 'Couple embracing by the stairs' },
  { fileName: 'album/2O4A0303.jpg', alt: 'Couple sharing a drink outdoors' },
  { fileName: 'album/2O4A9844.jpg', alt: 'Bride lounging on a vintage sofa' },
  { fileName: 'album/2O4A9869.jpg', alt: 'Bride leaning against the wall' },
  { fileName: 'album/2O4A9956.jpg', alt: 'Couple smiling in matching outfits' },
  { fileName: 'album/2O4A9965.jpg', alt: 'Bride posing with bouquet by the window' },
  { fileName: 'album/2O4A9985.jpg', alt: 'Couple walking through a garden' }
] as const;

export const photos: Photo[] = rawPhotos.map(({ fileName, alt }) => ({
  id: fileName.replace(/\.[^.]+$/, ""),
  fileName,
  src: encodeURI(`/${fileName}`),
  alt,
}));
