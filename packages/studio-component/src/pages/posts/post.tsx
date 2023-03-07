import { useMutation, useQuery } from "@tanstack/react-query";
import * as InkwellApi from "@inkwell/api-client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Input, Label, TypographySubtle } from "@doom.sh/ui";
import { Form, Field } from "houseform";
import { MarkdocEditor } from "../../components/markdoc-editor";
import MarkdocPreview from "../../components/markdoc-preview";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import MediaManager from "../../components/media-manager";

export const Post = () => {
  const { postId } = useParams();

  const getPost = useQuery({
    queryKey: ["post", postId],
    queryFn: () =>
      InkwellApi.PostsService.queryPostsFindUnique(parseInt(postId ?? "")),
  });

  const updatePost = useMutation({
    mutationFn: InkwellApi.PostsService.mutationPostsUpdate,
    onSuccess: () => getPost.refetch(),
  });

  if (typeof postId === "undefined" || isNaN(parseInt(postId))) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-4 h-4 bg-red-400 rounded-full" />
        <p>Invalid post ID</p>
      </div>
    );
  }

  if (getPost.isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
        <p>Loading post...</p>
      </div>
    );
  }

  if (getPost.isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-4 h-4 bg-red-400 rounded-full" />
        <p>Could not load post with this ID</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* back button */}
      <Link to={"/posts"} className="w-fit">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all posts</span>
        </Button>
      </Link>
      {/* slug editor */}
      <Form
        onSubmit={(values) => {
          updatePost.mutate({
            id: getPost.data.id,
            slug: values.slug,
          });
        }}
      >
        {({ submit }) => (
          <Field<string>
            name="slug"
            initialValue={getPost.data.slug}
            // todo(sarim): check for duplicate slug
            onChangeValidate={z
              .string()
              .min(
                1,
                "Invalid slug. A valid slug should be atleast 1 character long."
              )
              .refine((val) => {
                try {
                  const parseUrl = new URL(val, "http://localhost");
                  return !val.includes(" ") && !!parseUrl.pathname;
                } catch (e) {
                  return false;
                }
              }, "Invalid slug. A valid slug looks like this (without spaces): /my-page")}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="flex flex-col gap-4">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  type="text"
                  value={value}
                  placeholder="Post slug"
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => {
                    onBlur();
                    submit();
                  }}
                />
                {errors.map((error) => (
                  <TypographySubtle key={error}>{error}</TypographySubtle>
                ))}
              </div>
            )}
          </Field>
        )}
      </Form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 grid-rows-[500px]">
        {/* markdoc editor */}
        <div className="flex flex-col h-full gap-4">
          <Label>Editor</Label>
          <MarkdocEditor
            initialValue={getPost.data.content ?? ""}
            setValue={(newValue) => {
              console.log({ newValue });
              updatePost.mutate({
                id: getPost.data.id,
                content: newValue,
              });
            }}
          />
        </div>
        {/* markdoc preview */}
        <div className="flex flex-col h-full gap-4">
          <Label>Preview</Label>
          <MarkdocPreview value={getPost.data.content ?? ""} />
        </div>
      </div>
      {/* media uploads */}
      <div className="flex flex-col h-full gap-4 mt-6">
        <Label>Media</Label>
        <MediaManager postId={parseInt(postId)} />
      </div>
    </div>
  );
};
