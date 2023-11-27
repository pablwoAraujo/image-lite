"use client"

import { Button, InputText, Label, Template } from "@/components"
import { useState } from "react"

export default function LoginPage() {
  const [loading, setLoadin] = useState<boolean>(false);
  const [newUserState, setNewUserState] = useState<boolean>(true);

  return (
    <Template>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
            {newUserState ? "Create New User" : "Login to Yout Account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2">
            {
              newUserState &&
              <>
                <div>
                  <Label htmlFor="name">Name: </Label>
                </div>
                <div className="mt-2">
                  <InputText style="w-full" id="name" />
                </div>
              </>
            }
            <div>
              <Label htmlFor="email">Email: </Label>
            </div>
            <div className="mt-2">
              <InputText style="w-full" id="email" type="email" />
            </div>

            <div>
              <Label htmlFor="password">Password: </Label>
            </div>
            <div className="mt-2">
              <InputText style="w-full" id="password" type="password" />
            </div>

            {
              newUserState &&
              <>
                <div>
                  <Label htmlFor="passwordMatch">Repeat Password: </Label>
                </div>
                <div className="mt-2">
                  <InputText style="w-full" id="passwordMatch" />
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
                    onClick={event => setNewUserState(false)} />
                </>
              ) : (
                <>
                  <Button type="submit" label="Login" style="bg-indigo-700 hover:bg-indigo-500" />
                  <Button type="button"
                    label="Sign Up"
                    style="bg-red-700 hover:bg-red-500 mx-2"
                    onClick={event => setNewUserState(true)} />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </Template>
  )
}