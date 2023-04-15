import {
  useLocationProperty,
  navigate,
  BaseLocationHook,
} from "wouter/use-location";

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

export const toHash = (to: string) => "#" + to;

const hashNavigate = (to: string) => navigate(toHash(to));

export const useHashLocation: BaseLocationHook = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};
