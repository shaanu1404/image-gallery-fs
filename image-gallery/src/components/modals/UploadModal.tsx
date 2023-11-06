import { useEffect, useState } from "react";
import { Formik, FormikHelpers, Form } from "formik";
import { enqueueSnackbar } from "notistack";
import Select from "react-select";
import { DisplayUplodedImage, ProgressNotification } from "../common";
import { Button, Modal, AddMoreImagesButton } from "../common";
import { useGalleryList } from "../../hooks/gallery";
import { uploadImage } from "../../utils/galleryApis";

type UploadModalProps = {
  onClose?: () => void;
};

type UploadInitialValues = {
  gallery: { value: number; label: string } | null;
  images: FileList | null;
};

const initialValues: UploadInitialValues = {
  gallery: null,
  images: null,
};

export const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const { data, isLoading } = useGalleryList();
  const [galleryOptions, setGalleryOptions] = useState<any>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  useEffect(() => {
    if (data && data.data) {
      setGalleryOptions(
        data?.data.map((item) => ({ value: item.id, label: item.name }))
      );
    }
  }, [data]);

  const handleOnSubmit = async (
    values: UploadInitialValues,
    {
      setFieldError,
      resetForm,
      setSubmitting,
    }: FormikHelpers<UploadInitialValues>
  ) => {
    let isValid = true;
    if (!values.gallery) {
      setFieldError("gallery", "Please select gallery for uploading images");
      isValid = false;
    }

    if (!values.images || values.images?.length === 0) {
      setFieldError("images", "Please select atleast one image");
      isValid = false;
    }

    if (!isValid) return;

    const formData = new FormData();
    formData.append("gallery", String(values.gallery?.value));
    Array.from(values.images!).forEach((image) =>
      formData.append("images", image)
    );
    try {
      setIsUploading(true);
      const response = await uploadImage(formData, {
        onUploadProgress(progressEvent) {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total!);
          setUploadPercentage(percentage);
        },
      });
      enqueueSnackbar(response.data.message, { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: "error" });
    } finally {
      resetForm();
      setSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
      {({
        values,
        handleBlur,
        setFieldValue,
        touched,
        errors,
        isSubmitting,
      }) => {
        const removeImageFile = (index: number) => {
          if (values.images === null) return;
          const newValues = Array.from(values.images);
          newValues.splice(index, 1);
          setFieldValue("images", newValues);
        };

        return (
          <>
            {isUploading && (
              <ProgressNotification
                title="Uploading..."
                value={uploadPercentage}
              />
            )}
            <Form>
              <Modal title="Upload Images" onClose={onClose}>
                <div className="flex-1 overflow-y-auto">
                  {touched.images && errors.images && (
                    <div className="bg-red-100/60 px-4 py-1 rounded-md">
                      <p className="text-xs text-center text-red-600">
                        {errors.images}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-2 gap-4">
                    {values.images && values.images.length > 0
                      ? Array.from(values.images).map((image, i) => (
                          <DisplayUplodedImage
                            key={i}
                            src={URL.createObjectURL(image)}
                            onCancel={() => removeImageFile(i)}
                          />
                        ))
                      : null}
                    <AddMoreImagesButton name="images" />
                  </div>
                </div>
                <footer className="flex justify-between items-center space-x-4">
                  <div className="w-52">
                    <Select
                      name="gallery"
                      placeholder="Select gallery"
                      value={values.gallery}
                      options={galleryOptions}
                      onChange={(newValue, { name }) =>
                        setFieldValue(name as string, newValue)
                      }
                      onBlur={handleBlur}
                      isDisabled={isLoading}
                    />
                    {touched.gallery && errors.gallery && (
                      <p className="text-xs text-red-600">{errors.gallery}</p>
                    )}
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    Upload
                  </Button>
                </footer>
              </Modal>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
