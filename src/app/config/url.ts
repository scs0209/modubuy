export const backUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.BACK_URL
    : 'http://localhost:3000'
