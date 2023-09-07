/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      padding: {
        "5px": "5px",
        "10px": "10px",
        "15px": "15px",
        "20px": "20px",
      },
      width: {
        "20px": "20px",
        "25px": "25px",
      },
      height: {
        "20px": "20px",
        "25px": "25px",
        "30px": "30px",
        "80px": "80px",
      },
      margin: {
        "5px": "5px",
        "20px": "20px",
      },
      gap: {
        "5px": "5px",
        "10px": "10px",
        "15px": "15px",
        "20px": "20px",
      },
    },
  },
  plugins: [],
};
