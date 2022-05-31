export default {
  secret: process.env.APP_AUTH_JWT_SECRET || 'secret',
  expiryTime: process.env.APP_AUTH_JWT_EXPIRE_TIME || '90d'
}
