import { neon } from '@neondatabase/serverless'

// Lazy initialization of database client
// This prevents the connection from being created at build time
let sqlClient = null

function getSql() {
  if (!sqlClient) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    
    if (!connectionString) {
      // During build time, throw a helpful error
      // But this will only be called at runtime in API routes
      throw new Error('DATABASE_URL environment variable is not set. Please set it in Netlify environment variables.')
    }
    
    sqlClient = neon(connectionString)
  }
  
  return sqlClient
}

// Export sql as a lazy getter
// This way it's only initialized when actually used (at runtime, not build time)
export const sql = new Proxy(function() {}, {
  get(target, prop) {
    const client = getSql()
    if (typeof client[prop] === 'function') {
      return (...args) => client[prop](...args)
    }
    return client[prop]
  },
  apply(target, thisArg, argumentsList) {
    const client = getSql()
    return client.apply(thisArg, argumentsList)
  }
})

export { getSql }
