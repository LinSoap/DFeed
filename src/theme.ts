import { extendTheme,ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
};

// 扩展主题，添加自定义颜色
const theme = extendTheme({
  config, 
  colors: {
    custom: {
      bgColorMain: {
        light: "white",
        dark: "#212121",
      },
      bgColorAside: {
        light: "#f8f8f8",
        dark: "#171717",
      },
      themeColor: {
        red: "#e40872",
        blue: "#008fff",
        gray: "#f4f4f4",
      },
    },
  },
});


export default theme;

