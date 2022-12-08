import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Manuscript</span>,
  project: {
    link: "https://github.com/sarimabbas/manuscript",
  },
  footer: {
    text: () => (
      <>© {new Date().getFullYear()} Manuscript. All rights reserved.</>
    ),
  },
};

export default config;
