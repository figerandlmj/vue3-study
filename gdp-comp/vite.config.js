import vue from '@vitejs/plugin-vue'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/gdp-comp/src/assets/',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}