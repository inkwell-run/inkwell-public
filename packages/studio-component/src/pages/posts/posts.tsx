import {
  Button,
  Checkbox,
  toast,
  TypographyInlineCode,
  TypographyLarge,
  TypographySubtle,
} from "@doom.sh/ui";
import * as InkwellApi from "@inkwell/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import DateCycler from "../../components/date-cycler";
import useMultiSelect from "../../lib/use-multi-select";

export const Posts = () => {
  const getPosts = useQuery({
    queryKey: ["posts"],
    queryFn: () => InkwellApi.PostsService.queryPostsFindMany(),
  });

  if (getPosts.isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* header */}
      <TypographyLarge>Posts</TypographyLarge>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CreatePostButton />
      </div>
      {/* posts list */}
      <PostsList posts={getPosts.data ?? []} />
    </div>
  );
};

interface IPostsListProps {
  posts: Awaited<ReturnType<typeof InkwellApi.PostsService.queryPostsFindMany>>;
}

const PostsList = (props: IPostsListProps) => {
  const { posts } = props;
  const client = useQueryClient();

  // multiselect state
  const { toggle, selectedItemKeys, selectedItems, toggleAll } = useMultiSelect(
    {
      items: posts,
      getKeyFromItem: (post) => String(post.id),
    }
  );

  const deletePost = useMutation({
    mutationFn: InkwellApi.PostsService.mutationPostsDelete,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const handleDelete = async () => {
    const label = selectedItemKeys.size > 1 ? "posts" : "post";
    const p = Promise.all(
      selectedItems.map((item) => deletePost.mutateAsync(item.id))
    );
    toast.promise(p, {
      loading: `Deleting ${label}...`,
      success: `Deleted ${label} successfully`,
      error: `Failed to delete ${label}`,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* select/unselect all */}
        <div className="flex items-center gap-4">
          <Checkbox
            checked={selectedItemKeys.size > 0}
            onCheckedChange={() =>
              toggleAll(selectedItemKeys.size > 0 ? "unselect" : "select")
            }
          />
          <TypographySubtle>{selectedItemKeys.size} selected</TypographySubtle>
        </div>
        {/* delete */}
        {selectedItemKeys.size > 0 ? (
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        ) : null}
      </div>

      {/* post items */}
      <div className="flex flex-col gap-4">
        {posts
          ?.sort((a, b) =>
            compareDesc(new Date(a.createdAt), new Date(b.createdAt))
          )
          .map((p) => (
            <div className="flex items-center gap-4" key={p.id}>
              <Checkbox
                onCheckedChange={() => toggle(p)}
                checked={selectedItemKeys.has(String(p.id))}
              />
              <PostDisplay post={p} />
            </div>
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
    <div className="flex items-center justify-between flex-1 gap-4 px-4 py-2 border rounded-md shadow-sm">
      <Link to={`/posts/${post.id}`}>
        <TypographyInlineCode>{post.slug}</TypographyInlineCode>
      </Link>
      <DateCycler createdAt={post.createdAt} updatedAt={post.updatedAt} />
    </div>
  );
};

export const CreatePostButton = () => {
  const postCreate = useMutation({
    mutationFn: InkwellApi.PostsService.mutationPostsCreate,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
  const client = useQueryClient();

  return (
    <Button
      onClick={() => {
        toast.promise(
          postCreate.mutateAsync({
            slug: "ewfer",
            content: "ewrflkrejflrke",
          }),
          {
            loading: `Creating post...`,
            success: `Created post successfully`,
            error: `Failed to create post`,
          }
        );
      }}
    >
      Create new
    </Button>
  );
};
