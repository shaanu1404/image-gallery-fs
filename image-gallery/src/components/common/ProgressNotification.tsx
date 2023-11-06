type ProgressNotificationProps = {
  title?: string;
  value: number;
};

export const ProgressNotification: React.FC<ProgressNotificationProps> = (
  props
) => {
  const { title, value } = props;

  return (
    <div className="max-w-sm w-full py-3 px-4 bg-white shadow-lg rounded-2xl fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <h4 className="text-sm mb-2">{title}</h4>
      <ProgressBar value={value} />
    </div>
  );
};

type ProgressBarProps = { value: number };

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="w-full h-4 bg-gray-200 p-0.5 rounded-full border border-gray-300 overflow-hidden">
      <div
        className="bg-blue-500 h-full w-0 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
