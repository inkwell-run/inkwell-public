export interface IAdapter {
  useRouteInfo: () => {
    pathname: string;
    params: Record<string, string>;
  };
}
