import { useRef } from "react";
import { useField, useFormikContext } from "formik";
import { IoAdd } from "react-icons/all";

type AddMoreImagesButtonProps = { name: string };

export const AddMoreImagesButton = ({ name }: AddMoreImagesButtonProps) => {
  const ref = useRef<any>();
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleClick = () => {
    if (!ref.current) return;
    ref.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [
      ...(field.value ?? []),
      ...Array.from(e.currentTarget.files as FileList),
    ];
    const fileList: any[] = [],
      visited: any[] = [];
    files.forEach((file) => {
      if (!visited.includes(file.name)) {
        fileList.push(file);
        visited.push(file.name);
      }
    });
    setFieldValue(field.name, fileList);
  };

  const isError = meta.touched && meta.error;

  return (
    <div
      onClick={handleClick}
      className={`h-full min-h-[80px] w-full rounded-lg outline-2 outline-dotted outline-offset-2 ${
        isError ? "outline-red-500" : "outline-blue-500"
      } ${
        isError ? "bg-red-100/60" : "bg-white/60"
      } flex justify-center items-center text-3xl ${
        isError ? "text-red-500" : "text-blue-500"
      } ${
        isError ? "hover:bg-red-500/10" : "hover:bg-blue-500/10"
      } hover:cursor-pointer`}
    >
      <IoAdd />
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept=".jpg,.png,.jpeg"
        multiple={true}
        name={field.name}
        onBlur={field.onBlur}
        onChange={handleChange}
      />
    </div>
  );
};
