"use client"

import { AuthenticatedPage, Button, FieldError, ImagePreview, InputImage, InputTags, InputText, Label, Template, useNotification } from "@/components";
import { useImageService } from "@/resources/image/image.service";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FormProps, formScheme, formValidationScheme } from "./form.Scheme";


export default function FormPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const service = useImageService();
  const notification = useNotification();

  const formik = useFormik<FormProps>({
    initialValues: formScheme,
    onSubmit: handleSubmit,
    validationSchema: formValidationScheme
  })

  async function handleSubmit(dados: FormProps) {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", dados.file);
    formData.append("name", dados.name.trim());
    for (var i = 0; i < dados.tags.length; i++) {
      formData.append('tags', dados.tags[i]);
    }

    await service.save(formData);

    setImagePreview('');
    formik.resetForm();

    setLoading(false);
    notification.notify("Upload sent successfully!", "success");
  }

  function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0]
      formik.setFieldValue("file", file)
      const imageURL = URL.createObjectURL(file)
      setImagePreview(imageURL)
    }
  }

  return (
    <AuthenticatedPage>
      <Template loading={loading}>
        <section className="flex flex-col items-center justify-center my-5">
          <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">Nova Imagem</h5>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3">
              {/*NAME:*/}
              <div className="grid grid-cols-1">
                <Label htmlFor="name">Name *</Label>
                <InputText
                  id="name"
                  value={formik.values.name}
                  onKeyDown={e => { e.key === 'Enter' && e.preventDefault() }}
                  onChange={
                    e => {
                      e.preventDefault();
                      formik.setFieldValue("name", e.target.value)
                    }} />
                <FieldError error={formik.errors.name} />
              </div>

              {/*TAGS:*/}
              <div className="grid grid-cols-1">
                <Label htmlFor="tags">Tags *</Label>
                <InputTags id="tags" formik={formik} />
                <FieldError error={formik.errors.tags} />
              </div>

              {/*IMAGE:*/}
              <div className="grid grid-cols-1">
                <Label htmlFor="file">Image *</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <ImagePreview imagePreview={imagePreview} />
                    <InputImage id="file" onFileUpload={onFileUpload} />
                    <FieldError error={formik.errors.file} />
                  </div>
                </div>
              </div>

              {/*BUTTON*/}
              <div className="flex items-center justify-end gap-x-4">
                <Button style="bg-blue-500 hover:bg-blue-300" label="Save" type="submit" />
                <Link href={"/gallery"}>
                  <Button style="bg-red-500 hover:bg-red-300" label="Cancel" type="button" />
                </Link>
              </div>
            </div>
          </form>
        </section>
      </Template>
    </AuthenticatedPage>
  );
}
