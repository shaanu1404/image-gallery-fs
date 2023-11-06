import React from "react";
import { AiOutlineZoomIn } from "react-icons/ai";
import { Image } from "../../utils/types";

type ImageCardProps = {
  image: Image;
};

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className="relative h-56 w-full rounded-lg overflow-hidden cursor-pointer group">
      <img
        src={image.image}
        alt={image.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 hidden text-5xl text-white bg-black/50 group-hover:flex justify-center items-center transition-all">
        <AiOutlineZoomIn />
      </div>
    </div>
  );
};
