"use client"

import { Button, FieldError, InputText, Label, Template, useNotification } from "@/components"
import { useFormik } from "formik";
import { useState } from "react"
import { LoginForm, formScheme, validationScheme } from "./formScheme";
import { useAuth } from "@/resources";
import { AccessToken, Credentials } from "@/resources/user/user.resource";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoadin] = useState<boolean>(false);
  const [newUserState, setNewUserState] = useState<boolean>(false);

  const auth = useAuth();
  const router = useRouter();
  const notification = useNotification();

  async function onSubmit(values: LoginForm) {
    if (!newUserState) {
      const credentials: Credentials = { email: values.email, password: values.password };

      try {
        const accessToken: AccessToken = await auth.authenticate(credentials);
        router.push("/gallery")

      } catch (error: any){
        const message = error?.message;
        notification.notify(message, "error");
      }
    }
    console.log(values);
  }

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
    initialValues: formScheme,
    validationSchema: validationScheme,
    onSubmit: onSubmit
  })

  function changeForm() {
    resetForm();
    setNewUserState(!newUserState);
  }

  return (
    <Template>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
            {newUserState ? "Create New User" : "Login to Your Account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={handleSubmit}>
            {
              newUserState &&
              <>
                <div>
                  <Label htmlFor="name">Name: </Label>
                </div>
                <div className="mt-2">
                  <InputText style="w-full" id="name" value={values.name} onChange={handleChange} />
                  <FieldError error={errors.name} />
                </div>
              </>
            }
            <div>
              <Label htmlFor="email">Email: </Label>
            </div>
            <div className="mt-2">
              <InputText style="w-full" id="email" type="email" value={values.email} onChange={handleChange} />
              <FieldError error={errors.email} />
            </div>

            <div>
              <Label htmlFor="password">Password: </Label>
            </div>
            <div className="mt-2">
              <InputText style="w-full" id="password" type="password" value={values.password} onChange={handleChange} />
              <FieldError error={errors.password} />
            </div>

            {
              newUserState &&
              <>
                <div>
                  <Label htmlFor="passwordMatch">Repeat Password: </Label>
                </div>
                <div className="mt-2">
                  <InputText style="w-full" id="passwordMatch" type="password" value={values.passwordMatch} onChange={handleChange} />
                  <FieldError error={errors.passwordMatch} />
                </div>
              </>
            }

            <div>
              {newUserState ? (
                <>
                  <Button type="submit" label="Save" style="bg-indigo-700 hover:bg-indigo-500" />
                  <Button type="button"
                    label="Cancel"
                    style="bg-red-700 hover:bg-red-500 mx-2"
                    onClick={changeForm} />
                </>
              ) : (
                <>
                  <Button type="submit" label="Login" style="bg-indigo-700 hover:bg-indigo-500" />
                  <Button type="button"
                    label="Sign Up"
                    style="bg-red-700 hover:bg-red-500 mx-2"
                    onClick={changeForm} />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </Template>
  )
}