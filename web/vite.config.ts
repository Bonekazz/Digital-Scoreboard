import path from "path";
import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["robot.txt", "fav-180x180.ico", "apple-touch-icon-180x180.png", "pwa-192x192.png, pwa-512x512.png"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"]
      },
      manifest: {
        name: "Volley Scoreboard",
        short_name: "VolleyScoreboard",
        description: "A digital scoreboard for your volley match",
        display: "standalone",
        scope: "/",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ee0000",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
