import { toast, Button } from "@doom.sh/ui";
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
    ReturnType<typeof InkwellApi.PostsService.queryPostsFindMany>
  >[number];
}
const PostDisplay = (props: IPostDisplayProps) => {
  const { post } = props;
  return (
    <Link to={`/posts/${post.id}`}>
      <div className="p-4 border shadow-sm round ed-md">
        <div>{post.slug}</div>
        <DateCycler createdAt={post.createdAt} updatedAt={post.updatedAt} />
        {JSON.stringify(post)}
      </div>
    </Link>
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
    <div className="fixed bottom-4 right-4">
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
    </div>
  );
};
