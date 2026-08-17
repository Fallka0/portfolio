import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: '.',
  },
  // The vault PDFs live outside /public so nothing serves them statically. That
  // also means Next's tracer can't infer them from the route's imports, so name
  // them explicitly or the deployed function reads an empty directory.
  outputFileTracingIncludes: {
    '/api/vault/doc/[id]': ['./private/docs/**'],
  },
}

export default nextConfig
