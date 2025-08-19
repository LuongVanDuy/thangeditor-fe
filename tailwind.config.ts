import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00BC7D",
        secondary: "#495057",
        third: "#FE9A004D",
        brand: "#00bc7d",
        brandSoft: "#ECFDF5",
      },
      height: {
        fill: "-webkit-fill-available",
      },
      aspectRatio: {
        "2/1": "2 / 1",
      },
    },
    screens: {
      sm: "290px",
      "2xs": "430px",
      xs: "550px",
      md: "769px",
      lg: "1024px",
      xl: "1280px",
      "1xl": "1360px",
      "2xl": "1520px",
      "3xl": "1920px",
    },
  },
  plugins: [],
};
export default config;
