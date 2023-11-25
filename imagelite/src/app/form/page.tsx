"use client"

import { Button, ImagePreview, InputImage, InputTags, InputText, Label, Template } from "@/components";
import { useImageService } from "@/resources/image/image.service";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";

interface FormProps {
  name: string;
  tags: string[];
  file: any;
}

export default function FormPage() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const service = useImageService();

  const formScheme: FormProps = { name: '', tags: [], file: '' }
  const formik = useFormik<FormProps>({
    initialValues: formScheme,
    onSubmit: handleSubmit
  })

  async function handleSubmit(dados: FormProps) {
    const formData = new FormData();
    formData.append("file", dados.file);
    formData.append("name", dados.name);

    for (var i = 0; i < tags.length; i++) {
      formData.append('tags', tags[i]);
    }

    await service.save(formData);

    setImagePreview('');
    formik.resetForm();
    setTags([]);
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
    <Template>
      <section className="flex flex-col items-center justify-center my-5">
        <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">Nova Imagem</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-3">
            {/*NAME:*/}
            <div className="grid grid-cols-1">
              <Label htmlFor="name">Name</Label>
              <InputText
                id="name"
                value={formik.values.name}
                onKeyDown={e => { e.key === 'Enter' && e.preventDefault() }}
                onChange={
                  e => {
                    e.preventDefault();
                    formik.setFieldValue("name", e.target.value)
                  }} />
            </div>

            {/*TAGS:*/}
            <div className="grid grid-cols-1">
              <Label htmlFor="tags">Tags</Label>
              <InputTags id="tags" setTags={setTags} tags={tags} />
            </div>

            {/*IMAGE:*/}
            <div className="grid grid-cols-1">
              <Label htmlFor="file">Image</Label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <ImagePreview imagePreview={imagePreview} />
                  <InputImage id="file" onFileUpload={onFileUpload}/>
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
  );
}
