import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { enqueueSnackbar } from "notistack";
import { IoClose } from "react-icons/all";
import * as Yup from "yup";
import { createGallery } from "../../utils/galleryApis";
import { Loading } from "../common/Loading";

type GalleryInputCardProps = {
  onComplete?: () => void;
  onClose?: () => void;
};

type GalleryFormInitialValues = {
  name: string;
};

const initialValues: GalleryFormInitialValues = {
  name: "",
};

export const GalleryInputCard: React.FC<GalleryInputCardProps> = ({
  onComplete,
  onClose,
}) => {
  const { mutateAsync } = useMutation({
    mutationFn: createGallery,
  });

  const handleSubmit = async (
    values: GalleryFormInitialValues,
    { resetForm, setSubmitting }: FormikHelpers<GalleryFormInitialValues>
  ) => {
    try {
      const data = await mutateAsync(values);
      enqueueSnackbar(data.data?.message, { variant: "success" });
      onComplete?.();
      resetForm();
      setSubmitting(false);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <div
            className={`p-6 bg-white shadow-lg rounded-xl border flex justify-center items-center ${
              touched?.name && errors?.name && "border-red-500"
            } cursor-pointer`}
          >
            {!isSubmitting ? (
              <>
                <Field
                  type="text"
                  name="name"
                  className="text-sm outline-none w-full flex-1"
                  placeholder="Enter a name"
                  autoFocus
                  autoComplete="off"
                />
                <button type="button" onClick={onClose}>
                  <IoClose />
                </button>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
