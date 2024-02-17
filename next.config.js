/** @type {import('next').NextConfig} */
const nextConfig = {
   
   images:{
      remotePatterns:[{
         protocol: 'https',
         hostname: 'img.freepik.com',        
       },
      {protocol:'https',hostname:"localhost",port:'7142'}]
   }
}

module.exports = nextConfig
