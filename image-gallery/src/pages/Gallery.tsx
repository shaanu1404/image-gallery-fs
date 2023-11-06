import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ImageCard } from "../components/Gallery";
import { getGalleryData } from "../utils/galleryApis";
import { Loading } from "../components/common/Loading";

// export const galleryDataLoader: LoaderFunction = async ({ params }) => {
//   try {
//     const res = await Api.get<GalleryData>(`/gallery/${params.id}/`);
//     return res.data;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const Gallery = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["gallery", id],
    queryFn: () => getGalleryData(+id!),
  });

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    const err = error as any;
    throw new Response(err.message, { status: 404, statusText: "Not Found!" });
  }

  const { name, images } = data.data;

  return (
    <div>
      <h2 className="text-3xl text-black font-bold tracking-wide mb-1">
        {name}
      </h2>
      <p className="text-xs text-gray-400">Total {images.length} Images</p>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images && images.length > 0 ? (
          images?.map((image) => <ImageCard key={image.id} image={image} />)
        ) : (
          <p className="text-sm text-gray-800">No image available.</p>
        )}
      </div>
    </div>
  );
};
