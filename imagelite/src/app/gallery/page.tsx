"use client"

import { Template, ImageCard } from "@/components"
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";
import { useState } from "react"

export default function GalleryPage() {

  const useService = useImageService();

  const [images, setImages] = useState<Image[]>([]);

  async function searchImages() {
    const result = await useService.search();
    setImages(result);
  }

  function renderImageCard(image: Image) {
    return (
      <ImageCard
        key={image.url}
        title={image.name}
        src={image.url}
        size={image.size}
        dataUpload={image.uploadDate} />
    )
  }

  function renderImagesCard() {
    return images.map(renderImageCard);
  }

  return (
    <Template>
      <button onClick={searchImages}>Carregar imagens</button>
      <section className="grid grid-cols-3 gap-8">
        {renderImagesCard()}
      </section>
    </Template>
  )
}
