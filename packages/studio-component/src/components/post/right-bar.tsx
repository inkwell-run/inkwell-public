import { Label } from "@doom.sh/ui";
import React from "react";
import { ISchema } from "../../lib/base-props";
import { MediaManager } from "../media-manager";
import { SchemaSelector, SchemaValidator } from "../schema-selector";

interface IRightBarProps {
  postId: string;
  postContent: string;
  schemaChoices: string[];
  selectedSchema: string;
  schemaObjects: ISchema[];
  setSchema: (schema: string) => Promise<void>;
}

export const RightBar = (props: IRightBarProps) => {
  const {
    schemaChoices,
    selectedSchema,
    setSchema,
    schemaObjects,
    postId,
    postContent,
  } = props;
  return (
    <div className="flex flex-col h-full gap-8 p-4">
      {/* schemas */}
      {schemaObjects.length > 0 ? (
        <div className="flex flex-col gap-4">
          <Label>Schema</Label>
          <SchemaSelector
            choices={[...new Set(schemaChoices)]}
            value={selectedSchema}
            onValueChange={(value) => {
              setSchema(value);
            }}
          />
          <SchemaValidator
            postContent={postContent}
            schemaName={selectedSchema}
            schemas={schemaObjects}
          />
        </div>
      ) : null}
      {/* media manager */}
      <div className="flex flex-col gap-4">
        <Label>Media</Label>
        <MediaManager postId={postId} />
      </div>
    </div>
  );
};
