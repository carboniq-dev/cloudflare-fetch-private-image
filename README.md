# Cloudflare Fetch Private Image

Example showcasing the use of Cloudflare Workers and a React client to fetch private images.

## Add credentials

### Client

Rename the _.env.example_ to _.env_ and set the following variable:

```shell
VITE_IMAGE_WORKER_URL=
```

You'll also need to set the following variables in the _FetchPrivateImageExample.tsx_ file.

```shell
const IMAGE_ID = "";
const VARIANT_NAME = ""; # by default cloudflare sets the name to 'public'.
```

### Worker

Rename the _wrangler.image-worker.toml.example_ to _wrangler.image-worker.toml_ and set the following variables:

```shell
ACCOUNT_HASH = ""     # Navigate to the cloudflare Images Tab. There you'll find the hash.
IMAGES_API_TOKEN = "" # Navigate to the cloudflare Images/Keys Tab. That's where you'll find your token.
```

## Deployment

To deploy the worker, execute the following:

```shell
npm run deploy:worker
-or-
pnpm run deploy:worker
```

## Run the Client

To start the client, execute the following:

```shell
npm run dev
-or-
pnpm run dev
```
