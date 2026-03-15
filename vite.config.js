import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use SWC-based fast refresh (already default with @vitejs/plugin-react)
      fastRefresh: true,
    }),
    tailwindcss(),
  ],

  // Pre-bundle all heavy dependencies so they don't need to be processed on every cold start
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    // Force fresh prebundle on config change only
    force: false,
  },

  server: {
    // Use faster port (avoid conflicts)
    port: 5173,
    // Enable file system caching
    fs: {
      strict: false,
    },
    // Warm up frequently used files on startup for instant HMR
    warmup: {
      clientFiles: [
        './src/App.jsx',
        './src/components/Landing/Landing.jsx',
        './src/components/Navbar/Navbar.jsx',
        './src/components/GoogleBlobs/GoogleBlobs.jsx',
      ],
    },
  },

  build: {
    // Code-split by route for smaller initial bundles
    rollupOptions: {
      output: {
        // UPDATED: manualChunks must be a function in Vite 8
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('react-router-dom')) {
              return 'router';
            }
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor';
            }
          }
        }
      },
    },
    // Faster builds in dev
    minify: 'esbuild',
  },

  // Faster CSS processing
  css: {
    devSourcemap: false,
  },
})