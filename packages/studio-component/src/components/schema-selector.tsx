import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TypographyInlineCode,
} from "@doom.sh/ui";
import React from "react";
import { ISchema } from "../pages/_app";
import { AlertBox } from "./alert-box";
import { parse } from "ultramatter";
import { CheckIcon } from "lucide-react";

interface ISchemaSelectorProps {
  schemas: ISchema[];
  value?: string;
  onValueChange: (value: string) => void;
}

export const SchemaSelector = (props: ISchemaSelectorProps) => {
  return (
    <Select onValueChange={props.onValueChange} defaultValue={props.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a schema" />
      </SelectTrigger>
      <SelectContent>
        {props.schemas.map((s) => {
          return (
            <SelectItem value={s.name} key={s.name}>
              {s.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

interface ISchemaValidatorProps {
  schemaName: string;
  schemas: ISchema[];
  postContent: string;
}

export const SchemaValidator = (props: ISchemaValidatorProps) => {
  const schemaFromName = props.schemas.find((s) => s.name === props.schemaName);
  if (!schemaFromName) {
    return (
      <AlertBox>
        The <TypographyInlineCode>{props.schemaName}</TypographyInlineCode>{" "}
        schema was not found in your settings.
      </AlertBox>
    );
  }

  const frontmatter = parse(props.postContent).frontmatter;
  const parsedFromSchema = schemaFromName.validator.safeParse(frontmatter);

  if (!parsedFromSchema.success) {
    return (
      <AlertBox>
        Your post does not conform to the{" "}
        <TypographyInlineCode>{props.schemaName}</TypographyInlineCode> schema.
        Double-check your frontmatter.
      </AlertBox>
    );
  }

  return (
    <AlertBox iconOverride={<CheckIcon className="w-4 h-4 text-green-400" />}>
      Your post conforms to the
      <TypographyInlineCode>{props.schemaName}</TypographyInlineCode> schema.
    </AlertBox>
  );
};
