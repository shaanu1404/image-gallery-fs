import { IoAdd } from "react-icons/all";

type GalleryAddButtonProps = {
  onClick: () => void;
};

export const GalleryAddButton: React.FC<GalleryAddButtonProps> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="border-2 min-h-[70px] border-dotted border-blue-500 rounded-xl bg-white/60 flex justify-center items-center text-3xl text-blue-500 hover:bg-blue-500/10 hover:cursor-pointer"
    >
      <IoAdd />
    </div>
  );
};
