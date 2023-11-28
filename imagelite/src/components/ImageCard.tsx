import { useAuth } from "@/resources";
import { useEffect, useState } from "react";

interface ImageCardProps {
  title?: string;
  size?: number;
  dataUpload?: string;
  extension?: string;
  src?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ title, size, dataUpload, src, extension }: ImageCardProps) => {

  function download() {
    let objectUrl = window.URL.createObjectURL(downloadImage)
    window.open(objectUrl, "_blank");
  }

  const [imagesString, setImagesString] = useState<string>("");
  const [downloadImage, setDownloadImage] = useState<Blob>(new Blob([""], { type: '' }));

  const userSession = useAuth().getUserSession();

  const getBase64Image = async (res: { blob: () => any; }) => {
    const blob = await res.blob();
    const reader = new FileReader();

    await new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    setDownloadImage(blob);
    return reader.result;
  };

  useEffect(() => {
    fetch(`${src}`, {
      headers: {
        "Authorization": `Bearer ${userSession?.accesToken}`
      }
    })
      .then(getBase64Image)
      .then(imgString => setImagesString((imgString ? imgString.toString() : "")));
  }, []);

  return (
    <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
      <img src={imagesString} className="h-56 w-full object-cover rounded-t-md" alt={title} onClick={download} />
      <div className="card-body p-4">
        <div className="flex flex-column justify-between">
          <h5 className="text-xl font-semibold mb-2 text-gray-600">{title}</h5>
          <p className="flex items-center	text-gray-600"><span className=" bg-yellow-500 rounded-md p-1">{extension}</span></p>
        </div>
        <div className="flex flex-column justify-between">
          <p className="text-gray-600">{formatBytes(size, 2)}</p>
          <p className="text-gray-600">{dataUpload}</p>
        </div>
      </div>
    </div>
  )
}

function formatBytes(bytes: number = 0, decimals = 2) {
  if (!bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
