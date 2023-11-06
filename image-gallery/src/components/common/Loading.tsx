import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () => {
  return (
    <div className="text-3xl font-bold text-blue-500 flex justify-center items-center animate-spin">
      <AiOutlineLoading3Quarters />
    </div>
  );
};
