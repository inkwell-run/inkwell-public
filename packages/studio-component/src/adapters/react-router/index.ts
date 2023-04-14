import type { IAdapter } from "../common";
import { useLocation, useParams } from "react-router-dom";

export const ReactRouterAdapter: IAdapter = {
  useRouteInfo: () => {
    const { pathname } = useLocation();
    const params = useParams();
    return {
      pathname,
      params,
    };
  },
};
