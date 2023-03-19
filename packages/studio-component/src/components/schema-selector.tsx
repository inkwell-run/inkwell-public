import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TypographyInlineCode,
  TypographySubtle,
} from "@doom.sh/ui";
import React from "react";
import { AlertBox } from "./alert-box";
import { parse } from "ultramatter";
import { Check } from "lucide-react";
import { ISchema } from "../baseProps";

interface ISchemaSelectorProps {
  choices: string[];
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
        {props.choices.map((c) => {
          return (
            <SelectItem value={c} key={c}>
              {c}
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
  // if no schema, show nothing
  if (!props.schemaName) {
    return null;
  }

  // if schema, but not in list, show error
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
      <AlertBox
        addendum={
          <pre className="h-[200px] overflow-auto rounded-md border p-4 text-xs">
            <TypographySubtle>
              {JSON.stringify(parsedFromSchema.error, null, 2)}
            </TypographySubtle>
          </pre>
        }
      >
        Your post does not conform to the{" "}
        <TypographyInlineCode>{props.schemaName}</TypographyInlineCode> schema.
        Double-check your frontmatter.
      </AlertBox>
    );
  }

  return (
    <AlertBox iconOverride={<Check className="w-4 h-4 text-green-400" />}>
      Your post conforms to the{" "}
      <TypographyInlineCode>{props.schemaName}</TypographyInlineCode> schema.
    </AlertBox>
  );
};
