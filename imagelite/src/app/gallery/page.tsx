import { Template, ImageCard } from "@/components"

export default function GalleryPage() {
  return (
    <Template>
      <section className="grid grid-cols-3 gap-8">
        <ImageCard title="Montanha" size="10MB" dataUpload="31/10/2023" src="http://localhost:8080/v1/images/2c695250-e3d0-45e4-a66b-785fba3987b4"></ImageCard>
        <ImageCard src="http://localhost:8080/v1/images/2c695250-e3d0-45e4-a66b-785fba3987b4"></ImageCard>
        <ImageCard src="http://localhost:8080/v1/images/2c695250-e3d0-45e4-a66b-785fba3987b4"></ImageCard>
        <ImageCard src="http://localhost:8080/v1/images/2c695250-e3d0-45e4-a66b-785fba3987b4"></ImageCard>
      </section>
    </Template>
  )
}
