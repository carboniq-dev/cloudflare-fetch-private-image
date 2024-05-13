import { Router } from 'itty-router'
import { createCors } from 'itty-cors'
import { ImageService } from './image.service'
import { Env } from './types'

const { preflight, corsify } = createCors({
  origins: ['*'],
  methods: ['GET'],
})

const router = Router()

router.all('*', preflight)

router.get('/fetch-private-image', async (request: Request, env: Env) => {
  const imageService = new ImageService(env)

  const url = new URL(request.url)

  const imageId = url.searchParams.get('imageId') as string
  const variantName = url.searchParams.get('variantName') as string

  url.pathname = `https://imagedelivery.net/${env.ACCOUNT_HASH}/${imageId}/${variantName}`

  const imageDeliveryURL = new URL(url.pathname.slice(1).replace('https:/imagedelivery.net', 'https://imagedelivery.net'))

  await imageService.generateSignedUrl(imageDeliveryURL)

  return new Response(JSON.stringify({ url: imageDeliveryURL.href }))
})

export default {
  fetch: (request: Request, env: Env, ...args: any[]) => {
    return router.handle(request, env, ...args).then(corsify)
  },
}
