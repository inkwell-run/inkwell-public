import * as ManuscriptApi from "@manuscript/api-client";
import {
  Affix,
  Badge,
  Button,
  Card,
  Group,
  IconCheck,
  showNotification,
  Stack,
  Title,
  updateNotification,
} from "@manuscript/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import React from "react";
import DateCycler from "../../components/date-cycler";

const PostsPage = () => {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => ManuscriptApi.PostsService.queryPostsFindMany(),
  });

  return (
    <Stack sx={{ gap: "sm", padding: "sm" }}>
      <Title order={1} m={0}>
        Posts
      </Title>
      <p>These are all of your posts</p>
      <Stack>
        {posts.data
          ?.sort((a, b) =>
            compareDesc(new Date(a.createdAt), new Date(b.createdAt))
          )
          .map((p) => (
            <PostDisplay post={p} key={p.id} />
          ))}
      </Stack>
      <CreatePostButton refetch={posts.refetch} />
    </Stack>
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
    <a
      href="/posts/$slug"
      // params={{
      //   slug: "hello",
      // }}
    >
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group>
          <Badge>{post.slug}</Badge>
          <DateCycler createdAt={post.createdAt} updatedAt={post.updatedAt} />
        </Group>
        {JSON.stringify(post)}
      </Card>
    </a>
  );
};

export default PostsPage;

interface ICreatePostButtonProps {
  refetch: () => Promise<any>;
}

export const CreatePostButton = (props: ICreatePostButtonProps) => {
  const { refetch } = props;
  const postCreate = useMutation({
    mutationFn: ManuscriptApi.PostsService.mutationPostsCreate,
  });

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
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
                await refetch();
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
        Create new
      </Button>
    </Affix>
  );
};
