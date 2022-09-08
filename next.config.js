/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    OPENWEATHER_API_BASEURL : "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    OPENWEATHER_API_KEY : "7HM8GANJZW4MXNKSTWPJTME62",
    GEOLOCATION_GEOCODE_BASEURL : "https://maps.googleapis.com/maps/api/geocode/json",
    GEOLOCATION_API_KEY : "AIzaSyD93B_SN3Phn9avToCSCDEQ81CrvJZIV6A"
  },  
}

module.exports = nextConfig
