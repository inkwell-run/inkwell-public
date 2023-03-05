import { useQuery } from "@tanstack/react-query";
import * as InkwellApi from "@inkwell/api-client";
import React from "react";
import { useParams } from "react-router-dom";
import { Input, Label } from "@doom.sh/ui";
import { Form, Field } from "houseform";
import { MarkdocEditor } from "../../components/markdoc-editor";

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

  return (
    <div className="flex flex-col gap-8">
      {/* slug editor */}
      <Form>
        {({ submit }) => (
          <div>
            <Field name="slug" initialValue={post.data.slug}>
              {({ value, setValue, onBlur }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    type="text"
                    value={value}
                    placeholder="Post slug"
                  />
                </div>
              )}
            </Field>
          </div>
        )}
      </Form>
      {/* markdoc editor */}
      <MarkdocEditor initialValue="hello world!" />
    </div>
  );
};
