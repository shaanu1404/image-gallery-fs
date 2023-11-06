import React, { useState } from "react";
import {
  GalleryCard,
  GalleryInputCard,
  GalleryAddButton,
} from "../components/Gallery";
import { useGalleryList } from "../hooks/gallery";
import { Loading } from "../components/common/Loading";

export const Home: React.FC<{}> = () => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const { data, isLoading, isError, error, refetch } = useGalleryList();

  const changeInput = () => setIsInput(!isInput);

  const handleComplete = () => {
    refetch();
    setIsInput(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const err = error as any;
    throw new Response(err.message, { status: 404, statusText: "Not Found!" });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-2">
      {data &&
        data.data?.map((gallery) => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      {isInput ? (
        <GalleryInputCard
          onComplete={handleComplete}
          onClose={() => setIsInput(false)}
        />
      ) : (
        <GalleryAddButton onClick={changeInput} />
      )}
    </div>
  );
};
