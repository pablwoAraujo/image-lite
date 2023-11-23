"use client"

import { Button, Template } from "@/components";
import { InputTags } from "@/components/InputTags";
import { Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";

export default function FormPage() {
  const initialValues = {
    name: "",
    tags: [],
    image: ""
  };

  return (
    <Template>
      <section className="flex flex-col items-center justify-center my-5">
        <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">Nova Imagem</h5>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log(values)
          }}
        >
          {({ values }) => (
            <Form className="flex flex-col gap-3">
              {/*NAME:*/}
              <div className="grid grid-cols-1">
                <label className="block text-sm font-medium leading-6 text-gray-700" htmlFor={`name`}>Name</label>
                <Field type="text" name={`name`} className={`border px-3 py-2 rounded-lg text-gray-900`} />
              </div>

              {/*TAGS:*/}
              <FieldArray name="tags">
                {({ remove, push }) => (
                  <div className="grid grid-cols-1">
                    <label className="block text-sm font-medium leading-6 text-gray-700">Tags</label>
                    <InputTags push={push} remove={remove} tags={values.tags} />
                  </div>
                )}
              </FieldArray>

              {/*IMAGE:*/}
              <div className="grid grid-cols-1">
                <label className="block text-sm font-medium leading-6 text-gray-700">Image</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>

                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600" >
                        <span>Click to upload</span>
                        <Field name={`image`} type="file" className="sr-only" />
                      </label>
                    </div>
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
            </Form>
          )}
        </Formik>
      </section>
    </Template>
  );
}
