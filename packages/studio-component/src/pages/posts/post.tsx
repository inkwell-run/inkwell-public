import { Button, Input, Label, TypographySubtle } from "@doom.sh/ui";
import * as InkwellApi from "@inkwell/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, Form } from "houseform";
import { useAtomValue } from "jotai";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";
import { MarkdocEditor } from "../../components/markdoc-editor";
import MarkdocPreview from "../../components/markdoc-preview";
import { MediaManager } from "../../components/media-manager";
import {
  SchemaSelector,
  SchemaValidator,
} from "../../components/schema-selector";
import { GlobalStateAtom } from "../../lib/store";

export const Post = () => {
  const { postId } = useParams();
  const { baseProps } = useAtomValue(GlobalStateAtom);

  const getPost = useQuery({
    queryKey: ["post", postId],
    queryFn: () => InkwellApi.PostsService.queryPostsFindUnique(postId ?? ""),
  });

  const updatePost = useMutation({
    mutationFn: InkwellApi.PostsService.mutationPostsUpdate,
    onSuccess: () => getPost.refetch(),
  });

  if (typeof postId === "undefined" || !postId) {
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

  const schemaNames = baseProps.schemas.map((s) => s.name);
  const schemaChoices = getPost.data.schema
    ? [getPost.data.schema, ...schemaNames]
    : schemaNames;

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
      {/* schema selector */}
      {baseProps.schemas.length > 0 ? (
        <div className="flex flex-col h-full gap-4 mt-6">
          <Label>Schema</Label>
          <SchemaSelector
            choices={[...new Set(schemaChoices)]}
            value={getPost.data.schema}
            onValueChange={(value) => {
              updatePost.mutate({
                id: getPost.data.id,
                schema: value,
              });
            }}
          />
          <SchemaValidator
            postContent={getPost.data.content ?? ""}
            schemaName={getPost.data.schema ?? ""}
            schemas={baseProps.schemas}
          />
        </div>
      ) : null}
      {/* media uploads */}
      <div className="flex flex-col h-full gap-4">
        <Label>Media</Label>
        <MediaManager postId={postId} />
      </div>
    </div>
  );
};
