import { useEffect, useState } from "react";
import { fetchPrivateImage } from "./image.service";

const IMAGE_ID = "";
const VARIANT_NAME = "";

export const FetchPrivateImageExample = () => {
  const [signedUrl, setSignedUrl] = useState("");

  const fetchImage = async () => {
    const signed = await fetchPrivateImage({
      imageId: IMAGE_ID,
      variantName: VARIANT_NAME,
    });

    setSignedUrl(signed.url);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <h2>PRIVATE IMAGE</h2>
      <img src={signedUrl} alt="image" />
    </div>
  );
};
