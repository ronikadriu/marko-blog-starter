import qs from "qs";
import { Image, DataAttributes } from "../types/interfaces";

export const getStrapiURL = (path = "") => {
  return `http://127.0.0.1:1337${path}`;
};

export function getStrapiMedia(media: DataAttributes<Image>): string {
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

export function fetchAPI<T>(path: string, urlParamsObject = {}, options = {}): Promise<T> {
  // Merge default and user options
  const mergedOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

  return new Promise<T>((resolve, reject) => {
    fetch(requestUrl, mergedOptions)
      .then((response) => response.json())
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
