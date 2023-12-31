import { useAuth } from "..";
import { Image } from "./image.resource";

class ImageService {
  baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/images';
  auth = useAuth();

  async search(query: string = "", extension: string = ""): Promise<Image[]> {
    const userSession = this.auth.getUserSession();

    const url = `${this.baseURL}?query=${query}&extension=${extension}`;
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${userSession?.accesToken}`
      }
    });

    return await response.json();
  }

  async save(data: FormData): Promise<string> {
    const userSession = this.auth.getUserSession();

    const response = await fetch(this.baseURL, {
      method: 'POST',
      body: data,
      headers: {
        "Authorization": `Bearer ${userSession?.accesToken}`
      }
    })

    return response.headers.get('location') ?? ''
  }

  async find(src: string): Promise<string> {
    const userSession = this.auth.getUserSession();

    const response = await fetch(`http://localhost:8080/v1/images/${src}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${userSession?.accesToken}`
      }
    })

    return response.headers.get('location') ?? ''
  }

}

export const useImageService = () => new ImageService();
