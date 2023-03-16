import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@doom.sh/ui";
import React from "react";
import { ISchema } from "../pages/_app";

interface ISchemaSelectorProps {
  schemas: ISchema[];
}

const SchemaSelector = (props: ISchemaSelectorProps) => {
  return (
    <Select>
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

export default SchemaSelector;
