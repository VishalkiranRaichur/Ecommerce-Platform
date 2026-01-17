import { neon } from '@neondatabase/serverless'

// Lazy initialization of database client
// This prevents the connection from being created at build time
let sqlClient = null

function getSql() {
  if (!sqlClient) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    
    if (!connectionString) {
      // During build time or if not configured, return a function that throws
      // This allows the build to succeed but will fail at runtime with a helpful error
      return function sql(strings, ...values) {
        throw new Error('DATABASE_URL environment variable is not set. Please set it in Netlify environment variables.')
      }
    }
    
    sqlClient = neon(connectionString)
  }
  
  return sqlClient
}

// Export sql as a tagged template function
// This is only initialized when actually called (at runtime, not build time)
export const sql = (strings, ...values) => {
  const client = getSql()
  return client(strings, ...values)
}

export { getSql }
