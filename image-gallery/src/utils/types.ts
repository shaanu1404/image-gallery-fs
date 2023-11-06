export type Gallery = {
    id: number;
    name: string;
    user: number;
};

export type Image = {
    id: number;
    title: string;
    image: string;
    thumbnail: string | null;
}

export type GalleryData = Gallery & {
    images: Image[]
}

export type GalleryCreateDTO = {
    name: string;
}
type ResponseData = {
    message?: string
}

export type GalleryCreateResponseData = ResponseData

export type UploadImagesResponseData = ResponseData