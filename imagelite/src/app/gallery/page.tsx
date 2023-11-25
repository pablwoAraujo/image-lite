"use client"

import { Template, ImageCard, Button, InputText, useNotification } from "@/components";
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";
import { useState } from "react";
import Link from "next/link";

export default function GalleryPage() {

  const useService = useImageService();
  const notification = useNotification();

  const [images, setImages] = useState<Image[]>([])
  const [query, setQuery] = useState<string>("")
  const [extension, setExtension] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  async function searchImages() {
    setLoading(true);
    const result = await useService.search(query, extension);
    setImages(result);
    setLoading(false);

    if (result.length == 0) notification.notify("No result found!", "warning");
  }

  function renderImageCard(image: Image) {
    return (
      <ImageCard
        key={image.url}
        title={image.name}
        src={image.url}
        size={image.size}
        dataUpload={image.uploadDate}
        extension={image.extension} />
    )
  }

  function renderImagesCard() {
    return images.map(renderImageCard);
  }

  return (
    <Template loading={loading}>
      <section className="flex flex-col items-center justify-center my-5">
        <div className="flex space-x-4">
          <InputText onChange={event => setQuery(event.target.value)} placeholder="Digite nome ou tag" />

          <select onChange={event => setExtension(event.target.value)}
            className="border px-4 py-2 rounded-lg text-gray-900">

            <option value="">All formats</option>
            <option value="PNG">PNG</option>
            <option value="JPEG">JPEG</option>
            <option value="GIF">GIF</option>
          </select>

          <Button label="Search" style="bg-blue-500 hover:bg-blue=300" onClick={searchImages} />
          <Link href={"/form"}>
            <Button label="Add New" style="bg-yellow-500 hover:bg-yellow=300" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-8">
        {
          renderImagesCard()
        }
      </section>
    </Template>
  )
}
