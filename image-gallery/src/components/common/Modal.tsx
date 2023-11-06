import { IoMdCloseCircle } from "react-icons/io";
import { Backdrop } from "./Backdrop";

type ModalProps = {
  children: React.ReactNode | React.ReactNode[];
  onClose?: () => void;
  title?: string;
};

export const Modal: React.FC<ModalProps> = ({ children, title, onClose }) => {
  return (
    <Backdrop>
      <div className="max-w-4xl w-full h-[80vh] px-4 lg:px-0 mt-6 absolute left-1/2 -translate-x-1/2">
        <div className="h-full bg-white rounded-xl shadow-xl px-4 py-3 flex flex-col items-stretch space-y-4">
          <div className="flex justify-between items-center">
            {title && <h1 className="text-black text-lg">{title}</h1>}
            <button
              onClick={onClose}
              className="ml-auto text-gray-200 bg-white hover:text-gray-300 hover:bg-gray-100 text-xl rounded-full"
            >
              <IoMdCloseCircle />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Backdrop>
  );
};
