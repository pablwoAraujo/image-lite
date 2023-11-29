"use client"

import { useAuth } from "@/resources"
import LoginPage from "./login/page";
import GalleryPage from "./gallery/page";

export default function Home() {
  const auth = useAuth();

  if (!auth.getUserSession()) {
    return (
      <LoginPage />
    )
  }
  return (
    <GalleryPage />
  )
}
