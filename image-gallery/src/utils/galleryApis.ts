import { AxiosRequestConfig } from "axios";
import Api from "./api";
import { Gallery, GalleryData, GalleryCreateDTO, GalleryCreateResponseData, UploadImagesResponseData } from './types'

export const getGalleryList = () => Api.get<Gallery[]>('/gallery/')

export const createGallery = (body: GalleryCreateDTO) => Api.post<GalleryCreateResponseData>("/gallery/create/", body)

export const getGalleryData = (id: number) => Api.get<GalleryData>(`/gallery/${id}/`)

export const uploadImage = (body: any, { onUploadProgress }: AxiosRequestConfig) => Api.post<UploadImagesResponseData>('/gallery/images/upload/', body, { onUploadProgress })