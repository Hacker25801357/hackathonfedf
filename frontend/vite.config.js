import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  // load env to access VITE_API_URL at config time
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_URL;

  const config = {
    plugins: [react()],
    server: {
      port: 3000
    }
  };

  // Only configure proxy when VITE_API_URL is provided
  if (target) {
    config.server.proxy = {
      '/api': {
        target,
        changeOrigin: true
      }
    };
  }

  return defineConfig(config);
}
