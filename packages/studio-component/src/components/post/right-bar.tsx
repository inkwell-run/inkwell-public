import { Label } from "@doom.sh/ui";
import * as InkwellApi from "@inkwell.run/client";
import React from "react";
import { ISchema } from "../../lib/base-props";
import { MediaManager } from "../media-manager";
import { SchemaSelector, SchemaValidator } from "../schema-selector";

interface IRightBarProps {
  post: Awaited<
    ReturnType<typeof InkwellApi.PostsService.queryPostsFindUnique>
  >;
  schemaChoices: string[];
  schemaObjects: ISchema[];
  setSchema: (schema: string) => Promise<void>;
}

export const RightBar = (props: IRightBarProps) => {
  const { schemaChoices, setSchema, schemaObjects, post } = props;
  return (
    <div className="flex flex-col h-full gap-8 p-4">
      {/* schemas */}
      {schemaObjects.length > 0 ? (
        <div className="flex flex-col gap-4">
          <Label>Schema</Label>
          <SchemaSelector
            choices={[...new Set(schemaChoices)]}
            value={post.schema}
            onValueChange={(value) => {
              setSchema(value);
            }}
          />
          <SchemaValidator
            postContent={post.content ?? ""}
            schemaName={post.schema ?? ""}
            schemas={schemaObjects}
          />
        </div>
      ) : null}
      {/* media manager */}
      <div className="flex flex-col gap-4">
        <Label>Media</Label>
        <MediaManager postId={post.id} />
      </div>
    </div>
  );
};
