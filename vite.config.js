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
  define: {
    'process.env.GIT_COMMIT_SHA': JSON.stringify(getGitCommitSHA())
  }
})
