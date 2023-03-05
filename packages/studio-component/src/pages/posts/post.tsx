import { useQuery } from "@tanstack/react-query";
import * as InkwellApi from "@inkwell/api-client";
import React from "react";
import { useParams } from "react-router-dom";

export const Post = () => {
  const { postId } = useParams();

  const post = useQuery({
    queryKey: ["post", postId],
    queryFn: () =>
      InkwellApi.PostsService.queryPostsFindUnique(parseInt(postId ?? "")),
  });

  if (typeof postId === "undefined" || isNaN(parseInt(postId))) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-4 h-4 bg-red-400 rounded-full" />
        <p>Invalid post ID</p>
      </div>
    );
  }

  if (post.isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
        <p>Loading post...</p>
      </div>
    );
  }

  if (post.isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-4 h-4 bg-red-400 rounded-full" />
        <p>Could not load post with this ID</p>
      </div>
    );
  }

  return <div>Post slug {post.data?.slug}</div>;
};
