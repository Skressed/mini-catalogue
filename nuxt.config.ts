export default defineNuxtConfig({
  ssr: process.env.NUXT_SSR !== 'false',
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  typescript: { strict: true },
  nitro: {
    preset: process.env.NUXT_SSR === 'true' && process.env.VERCEL ? 'vercel' : undefined
  }
})
