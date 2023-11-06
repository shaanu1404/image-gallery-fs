type BackdropProps = {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
};

export const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <div className="fixed inset-0 z-40 bg-black/60" onClick={onClick}>
      {children}
    </div>
  );
};
