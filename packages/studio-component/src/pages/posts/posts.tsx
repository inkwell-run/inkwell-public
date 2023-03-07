import {
  Button,
  Checkbox,
  toast,
  TypographyInlineCode,
  TypographyLarge,
} from "@doom.sh/ui";
import * as InkwellApi from "@inkwell/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import DateCycler from "../../components/date-cycler";

export const Posts = () => {
  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: () => InkwellApi.PostsService.queryPostsFindMany(),
  });

  return (
    <div className="flex flex-col gap-8">
      {/* header */}
      <TypographyLarge>Posts</TypographyLarge>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CreatePostButton refetch={posts.refetch} />
      </div>
      {/* posts list */}
      <div className="flex flex-col gap-2">
        {posts.data
          ?.sort((a, b) =>
            compareDesc(new Date(a.createdAt), new Date(b.createdAt))
          )
          .map((p) => (
            <PostDisplay post={p} key={p.id} />
          ))}
      </div>
    </div>
  );
};

interface IPostDisplayProps {
  post: Awaited<
    ReturnType<typeof InkwellApi.PostsService.queryPostsFindMany>
  >[number];
}
const PostDisplay = (props: IPostDisplayProps) => {
  const { post } = props;
  return (
    <div className="flex items-center gap-4">
      <Checkbox />
      <div className="flex items-center justify-between flex-1 gap-4 px-4 py-2 border rounded-md shadow-sm">
        <Link to={`/posts/${post.id}`}>
          <TypographyInlineCode>{post.slug}</TypographyInlineCode>
        </Link>
        <DateCycler createdAt={post.createdAt} updatedAt={post.updatedAt} />
      </div>
    </div>
  );
};

interface ICreatePostButtonProps {
  refetch: () => Promise<any>;
}

export const CreatePostButton = (props: ICreatePostButtonProps) => {
  const { refetch } = props;
  const postCreate = useMutation({
    mutationFn: InkwellApi.PostsService.mutationPostsCreate,
  });

  return (
    <Button
      onClick={() => {
        const loadingToast = toast.loading("Creating post");
        postCreate.mutate(
          {
            slug: "ewfer",
            content: "ewrflkrejflrke",
          },
          {
            onSuccess: async () => {
              await refetch();
              toast.success("Created post", {
                id: loadingToast,
              });
            },
          }
        );
      }}
    >
      Create new
    </Button>
  );
};
