import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Inkwell</span>,
  project: {
    link: "https://github.com/inkwell/inkwell-public",
  },
  footer: {
    text: () => <>© {new Date().getFullYear()} Inkwell. All rights reserved.</>,
  },
};

export default config;
