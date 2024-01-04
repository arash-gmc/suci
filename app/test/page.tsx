import { Box } from "@radix-ui/themes";
import { Roboto, Ubuntu } from "next/font/google";
import React from "react";
import localFonts from "next/font/local";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "auto",
});
const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "auto",
});
const vazir = localFonts({
  src: "../../public/Vazir.woff2",
});
const page = () => {
  return (
    <Box
      p="8"
      className={" bg-green-400"}
    >
      <span className="font-bold">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id debitis
        quia error beatae distinctio. Illum dolorum neque vel qui fugiat. این
        یکی تست است
      </span>
    </Box>
  );
};

export default page;
