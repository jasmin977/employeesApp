module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-dark-blue": "rgba(41, 47, 120, 1)",
        "my-sky-blue": "rgba(8, 138, 228, 1)",
        "my-sky-blue-transparent": "rgba(8, 138, 228, 0.3)",

        no_status: "#ebecf5",
        present: "#6CE63A",
        absent: "#f44336",
        late: "#EF7B6B",
        extra: "#5FD5FB",
      },
    },
  },
  plugins: [],
};
