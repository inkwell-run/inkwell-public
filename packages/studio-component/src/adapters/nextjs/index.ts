import type { IAdapter } from "../common";
import { usePathname, useParams } from "next/navigation";

export const NextAdapter: IAdapter = {
  useRouteInfo: () => {
    const pathname = usePathname();
    const params = useParams();
    return {
      pathname,
      params,
    };
  },
};
