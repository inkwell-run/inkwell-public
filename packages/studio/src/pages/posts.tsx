import { Box, Title } from "@manuscript/lib";
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
    <Box
      sx={(t) => ({
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: t.spacing.sm,
        padding: t.spacing.sm,
      })}
    >
      <Title order={1} m={0}>
        Posts
      </Title>
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
    </Box>
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
    <Box
      sx={(t) => ({
        padding: t.spacing.sm,
        borderRadius: t.radius.sm,
        backgroundColor: t.colors.blue[6],
      })}
    >
      {/* slug */}
      <div>{post.slug}</div>
      {JSON.stringify(post)}
    </Box>
  );
};

export default PostsPage;
