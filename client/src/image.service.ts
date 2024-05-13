interface FetchParamas {
  imageId: string;
  variantName: string;
}

async function fetchPrivateData(args: {
  url: string;
  params: FetchParamas;
}): Promise<any> {
  const queryString = Object.entries(args.params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  const urlWithQueryString = `${args.url}?${queryString}`;

  const response = await fetch(urlWithQueryString, {
    method: "GET",
  });

  return response.json();
}

export async function fetchPrivateImage(params: FetchParamas): Promise<any> {
  return fetchPrivateData({
    url: `${import.meta.env.VITE_IMAGE_WORKER_URL}/fetch-private-image`,
    params,
  });
}
