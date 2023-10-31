// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig


const {PHASE_DEVELOPMENT_SERVER} = require('next/constants')
const dotenv = require('dotenv')

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = (phase, {defaultConfig}) => {
  return {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      SCHEMA: process.env.SCHEMA
    }
  }
}
