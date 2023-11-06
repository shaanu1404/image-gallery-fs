import { IoMdCloseCircle } from "react-icons/io";

type DisplayUplodedImageProps = {
  src: string;
  alt?: string;
  onCancel?: () => void;
};

export const DisplayUplodedImage: React.FC<DisplayUplodedImageProps> = ({
  src,
  alt,
  onCancel,
}) => {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className="h-full min-h-[180px] max-h-[180px] w-full object-center object-cover rounded-lg outline-2 outline-dotted outline-offset-2 outline-blue-500"
      />
      <button
        type="button"
        onClick={onCancel}
        className="hidden group-hover:block absolute top-2 right-2 text-red-500 text-lg bg-white rounded-full"
      >
        <IoMdCloseCircle />
      </button>
    </div>
  );
};
