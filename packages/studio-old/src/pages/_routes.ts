import { createMemoryHistory, createReactRouter } from "@tanstack/react-router";
import { postsConfig } from "./posts/_routes";
import { rootRoute } from "./root";
import { schemasConfig } from "./schemas/_routes";

const routeConfig = rootRoute.addChildren([schemasConfig, postsConfig]);

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"], // Pass your initial url
});

export const router = createReactRouter({
  routeConfig,
  history: memoryHistory,
});

// declare module "@tanstack/react-router" {
//   interface RegisterRouter {
//     router: typeof router;
//   }
// }
