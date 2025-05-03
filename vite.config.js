import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

const getGitCommitSHA = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim()
  } catch (error) {
    console.warn('Failed to get git commit SHA:', error)
    return 'unknown'
  }
}

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  server: {
    watch: {},
    port: 17027,
    strictPort: true,
    headers: {
      'warning': 'authorized',
      'x-source': 'cloudflare',
      'x-author': 'offensive-vk',
      'x-server': 'restricted',
      'x-xss-protection': true,
      'x-commit': JSON.stringify(getGitCommitSHA())
    },
    warmup: {
      clientFiles: ['./src/components/*.jsx', './src/context/dataContext.jsx'],
    },
  },
  build: {
    // chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {},
  define: {
    'process.env.GIT_COMMIT_SHA': JSON.stringify(getGitCommitSHA())
  }
})
