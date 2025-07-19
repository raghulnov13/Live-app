import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "0.0.0.0", // or your LAN IP like '192.168.1.10'
    host: "0.0.0.0",
    port: 5177,
    strictPort: true, // prevents auto-switching to another port
  },
});
