import * as Yup from "yup";

export interface FormProps {
  name: string;
  tags: string[];
  file: string | Blob;
}

export const formScheme: FormProps = { name: "", tags: [], file: "" }

export const formValidationScheme = Yup.object().shape({
  name: Yup.string().trim()
    .required("Name is required!")
    .min(4, "The name must be longer than 3 characters!")
    .max(50, "Name has the limit of 50 characters!"),
  tags: Yup.array()
    .of(Yup.string()
      .matches(new RegExp(/^[\w&.-]+$/), "Special characters are not allowed!")
      .max(14, "Each tag has the limit of 14 characters!")
      .required())
    .required("Tags are required!")
    .min(1, "Tags field must have at least 1 items")
    .max(5, "Tags field has a limit of 5 items!"),
  file: Yup.mixed<Blob>()
    .required("Select an image to upload!")
    .test("size", "File size cannot be higher than 4 MB", (file) => {
      return file.size < 4000000;
    })
    .test("type", "Accepted formats: jpeg, giff or png", (file) => {
      return file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
    })
})
