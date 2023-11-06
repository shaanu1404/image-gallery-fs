import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import { Button } from "./Button";
import { UploadModal } from "../modals";

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <div className="flex justify-between items-center py-3 mb-3">
      <Link to="/">
        <h5 className="text-2xl text-black">{title}</h5>
      </Link>
      <Button icon={<AiOutlineUpload />} onClick={() => setShowModal(true)}>
        Upload
      </Button>
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </div>
  );
};
