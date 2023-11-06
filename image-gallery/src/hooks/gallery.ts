import { useQuery } from "@tanstack/react-query";
import { getGalleryList } from "../utils/galleryApis";

export const useGalleryList = () => {
    return useQuery({
        queryKey: ["gallery"],
        queryFn: getGalleryList,
    });
}