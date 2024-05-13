import { Env } from './types'

export class ImageService {
  constructor(private env: Env) {}

  /**
   * Generate a signed url for private images with an expiration.
   * This is the official code provided by cloudflare:
   * @see https://developers.cloudflare.com/images/manage-images/serve-images/serve-private-images/
   * @param url
   * @param env
   * @returns
   */
  async generateSignedUrl(url: URL): Promise<URL> {
    const KEY = this.env.IMAGES_API_TOKEN
    const EXPIRATION = 60 * 60 * 24

    const encoder = new TextEncoder()
    const secretKeyData = encoder.encode(KEY)
    const key = await crypto.subtle.importKey('raw', secretKeyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])

    const expiry = Math.floor(Date.now() / 1000) + EXPIRATION
    url.searchParams.set('exp', expiry.toString())

    const stringToSign = url.pathname + '?' + url.searchParams.toString()

    // Generate the signature
    const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(stringToSign))
    const sig = this.bufferToHex(new Uint8Array(mac).buffer)

    url.searchParams.set('sig', sig)

    return url
  }

  bufferToHex(buffer: ArrayBuffer): string {
    return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('')
  }
}
