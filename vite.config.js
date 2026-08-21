import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Inside the container the dev server always listens on 5173. On the host it is
// published on WEB_PORT (default 5174, because 5173 is very often already taken
// by an editor's port forwarding). Those two numbers differ, so the HMR client
// running in the browser has to be told which port to dial — otherwise it opens
// a socket to 5173 on the host and talks to whatever else is squatting there.
const HOST_PORT = Number(process.env.WEB_PORT) || 5174

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: { clientPort: HOST_PORT },
    // Bind-mounted source on a Windows host: native fs events do not cross the
    // boundary into the Linux container, so the watcher has to poll.
    watch: { usePolling: true, interval: 300 },
  },
  preview: { host: '0.0.0.0', port: 4173, strictPort: true },
  build: { outDir: 'dist', sourcemap: false, target: 'es2020' },
})
