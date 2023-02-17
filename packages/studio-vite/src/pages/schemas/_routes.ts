import { rootRoute } from "../root";
import SchemasPage from "./schemas";

export const schemasRoute = rootRoute.createRoute({
  path: "/schemas",
  component: SchemasPage,
});

export const schemasConfig = schemasRoute.addChildren([]);
