import React from "react";
import { Link } from "react-router-dom";

import { Gallery } from "../../utils/types";

type GalleryCardProps = {
  gallery: Gallery;
};

export const GalleryCard: React.FC<GalleryCardProps> = ({ gallery }) => {
  return (
    <Link to={`/${gallery.id}`}>
      <div className="p-6 bg-white shadow-lg rounded-xl border cursor-pointer">
        <p className="text-sm">{gallery.name}</p>
      </div>
    </Link>
  );
};
