// Define the module exports to specify the Next.js configuration
module.exports = {
  // Set the strict mode for React
  reactStrictMode: true,
  // Set environment variables that will be available in the client-side code
  env: {
    // Assign the value of the PRIVATE_KEY environment variable to the PRIVATE_KEY variable
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
};
