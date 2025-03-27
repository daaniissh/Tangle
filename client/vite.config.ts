import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src")
      },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "./src/components")
      },
      {
        find: "@/interfaces",
        replacement: path.resolve(__dirname, "./src/interfaces")
      },
      {
        find: "@/logos",
        replacement: path.resolve(__dirname, "./src/logos")
      }
    ]
  },
  build: {
    outDir: "dist",
    sourcemap: true // Optional for debugging
  },
  server: {
    port: 3000,
    open: true
  }
})