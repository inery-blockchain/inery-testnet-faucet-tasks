// Import the required modules
const { join } = require('path')

// Define the configuration
module.exports = {
  content: [
    // Specify the files that contain the CSS content
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    // Extend the default theme by adding new properties or overriding existing ones
    extend: {},
  },
  plugins: [], // Add any plugins here
}
