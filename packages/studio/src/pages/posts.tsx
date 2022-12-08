import {
  Box,
  Title,
  showNotification,
  updateNotification,
  Button,
  IconCheck,
} from "@manuscript/lib";
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
      <Button
        onClick={() => {
          showNotification({
            id: "create-post",
            title: "Creating post",
            message: "Hang tight...",
            loading: true,
            autoClose: false,
          });
          postCreate.mutate(
            {
              slug: "ewfer",
              content: "ewrflkrejflrke",
            },
            {
              onSuccess: async () => {
                await posts.refetch();
                updateNotification({
                  id: "create-post",
                  title: "Created post",
                  message: "Your post has been created successfully.",
                  loading: false,
                  icon: <IconCheck />,
                  autoClose: 2000,
                });
              },
            }
          );
        }}
      >
        Create new post
      </Button>
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
