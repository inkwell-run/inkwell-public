import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import * as ManuscriptApi from "../api-client";

const PostsPage = () => {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => ManuscriptApi.PostsService.queryPostsFindMany(),
  });

  const postCreate = useMutation({
    mutationFn: ManuscriptApi.PostsService.mutationPostsCreate,
  });

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <h1 className="text-lg">Posts</h1>
      <p>These are all of your posts</p>
      <button
        onClick={() => {
          // const toastId = toast.loading("Creating post");
          postCreate.mutate(
            {
              slug: "ewfer",
              content: "ewrflkrejflrke",
            },
            {
              onSuccess: async () => {
                await posts.refetch();
                // toast.success("Created post", {
                //   id: toastId,
                // });
              },
            }
          );
        }}
      >
        create new
      </button>
      {posts.data?.map((p) => (
        <PostDisplay post={p} key={p.id} />
      ))}
    </div>
  );
};

interface IPostDisplayProps {
  post: Awaited<
    ReturnType<typeof ManuscriptApi.PostsService.queryPostsFindMany>
  >[number];
}
const PostDisplay = (props: IPostDisplayProps) => {
  const { post } = props;
  return (
    <div className="p-4 border rounded-md border-color">
      {/* slug */}
      <div>{post.slug}</div>
      {JSON.stringify(post)}
    </div>
  );
};

export default PostsPage;
