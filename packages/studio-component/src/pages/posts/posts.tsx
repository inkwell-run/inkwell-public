import * as ManuscriptApi from "@manuscript/api-client";
import {
  Affix,
  Badge,
  Button,
  Card,
  Group,
  IconCheck,
  showNotification,
  updateNotification,
} from "@manuscript/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import React from "react";
import DateCycler from "../../components/date-cycler";

export const Posts = () => {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => ManuscriptApi.PostsService.queryPostsFindMany(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-medium">Posts</div>
      <p>These are all of your posts</p>
      <div className="flex flex-col gap-4">
        {posts.data
          ?.sort((a, b) =>
            compareDesc(new Date(a.createdAt), new Date(b.createdAt))
          )
          .map((p) => (
            <PostDisplay post={p} key={p.id} />
          ))}
      </div>
      <CreatePostButton refetch={posts.refetch} />
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
