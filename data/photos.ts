export type AlbumPhoto = {
  id: string;
  src: string;
  alt: string;
};

type AlbumPhotoDefinition = {
  id: string;
  alt: string;
  desktop: string;
  mobile: string;
  detail: string;
};

const albumPhotoDefinitions: AlbumPhotoDefinition[] = [
  {
    id: 'album-2O4A0071',
    alt: 'Couple walking along a hillside path',
    desktop: '/album/2O4A0071-md.jpg',
    mobile: '/album/2O4A0071.jpg',
    detail: '/album/2O4A0071.jpg'
  },
  {
    id: 'album-2O4A0091',
    alt: 'Bride leaning on groom in mobile crop',
    desktop: '/album/2O4A0091.jpg',
    mobile: '/album/2O4A0091-mobile.jpg',
    detail: '/album/2O4A0091.jpg'
  },
  // {
  //   id: 'album-2O4A0125',
  //   alt: 'Bride looking out the window',
  //   desktop: '/album/2O4A0125-pc.jpg',
  //   mobile: '/album/2O4A0125.jpg',
  //   detail: '/album/2O4A0125.jpg',
  // },
  {
    id: 'album-2O4A0269',
    alt: 'Couple embracing by the stairs',
    desktop: '/album/2O4A0269.jpg',
    mobile: '/album/2O4A0269.jpg',
    detail: '/album/2O4A0269.jpg'
  },
  {
    id: 'album-2O4A0303',
    alt: 'Couple sharing a drink outdoors',
    desktop: '/album/2O4A0303.jpg',
    mobile: '/album/2O4A0303.jpg',
    detail: '/album/2O4A0303.jpg'
  },
  {
    id: 'IMG_3407',
    alt: 'Bride lounging on a vintage sofa',
    desktop: '/album/IMG_3407.JPG',
    mobile: '/album/IMG_3407.JPG',
    detail: '/album/IMG_3407.JPG'
  },
  {
    id: 'album-2O4A9869',
    alt: 'Bride leaning against the wall',
    desktop: '/album/2O4A9869.jpg',
    mobile: '/album/2O4A9869-mobile.jpg',
    detail: '/album/2O4A9869-mobile.jpg'
  },
  {
    id: 'album-2O4A9956',
    alt: 'Couple smiling in matching outfits',
    desktop: '/album/2O4A9956.jpg',
    mobile: '/album/2O4A9956.jpg',
    detail: '/album/2O4A9956.jpg'
  },
  {
    id: 'album-2O4A9965',
    alt: 'Bride posing with bouquet by the window',
    desktop: '/album/2O4A9965.jpg',
    mobile: '/album/2O4A9965.jpg',
    detail: '/album/2O4A9965.jpg'
  }
  // {
  //   id: 'album-2O4A9985',
  //   alt: 'Couple walking through a garden',
  //   desktop: '/album/2O4A9985.jpg',
  //   mobile: '/album/2O4A9985.jpg',
  //   detail: '/2O4A9985.jpg'
  // }
] as const;

type PhotoVariantKey = "desktop" | "mobile" | "detail";

const mapPhotoVariant = (variant: PhotoVariantKey): AlbumPhoto[] =>
  albumPhotoDefinitions.map(({ id, alt, ...sources }) => ({
    id,
    alt,
    src: encodeURI(sources[variant]),
  }));

export const albumPhotos = {
  desktop: mapPhotoVariant('desktop'),
  mobile: mapPhotoVariant('mobile'),
  detail: mapPhotoVariant('detail'),
} as const;

// Backwards compatibility for any remaining imports
export const photos = albumPhotos.desktop;
