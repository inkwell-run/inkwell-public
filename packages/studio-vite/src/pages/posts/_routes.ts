import { rootRoute } from "../root";
import PostDetailPage from "./post";
import PostsPage from "./posts";

export const postsRoute = rootRoute.createRoute({
  path: "/posts",
  component: PostsPage,
});

export const postRoute = postsRoute.createRoute({
  path: "$slug",
  component: PostDetailPage,
});

export const postsConfig = postsRoute.addChildren([postRoute]);
