/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //   colors: {
      //     primary: "#007BFF", // رنگ اصلی
      //     secondary: "#f1f5f9", // رنگ پس‌زمینه
      //     text: "#333333", // رنگ متن
      //   },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".table-container": {
          "@apply w-full max-w-4xl mx-auto mt-5 rounded-lg shadow-lg overflow-hidden":
            {},
        },
        ".vehicle-table": {
          "@apply w-full border-collapse bg-white rounded-lg": {},
        },
        ".vehicle-table th": {
          "@apply bg-primary text-white p-3 text-left": {},
        },
        ".vehicle-table td": {
          "@apply p-3 border-b border-gray-300 text-gray-700": {},
        },
        ".vehicle-table tr:hover": {
          "@apply bg-gray-100": {},
        },
      });
    },
  ],
};
