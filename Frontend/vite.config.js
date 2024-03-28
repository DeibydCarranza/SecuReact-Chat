import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/socket.io':{
        target:'http://localhost:4000',
        ws:true
      }
    }
  }
})
