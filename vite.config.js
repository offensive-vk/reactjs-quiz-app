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
  server: {
    https: true,
    port: 17027,
    strictPort: true,
    open: true,
    headers: {
      'x-source': 'github',
      'x-author': '@offensive-vk',
      'x-server': '@offensive-vk',
      'x-xss-protection': true,
      'server': '@offensive-vk',
    }
  },
  define: {
    'process.env.GIT_COMMIT_SHA': JSON.stringify(getGitCommitSHA())
  }
})
