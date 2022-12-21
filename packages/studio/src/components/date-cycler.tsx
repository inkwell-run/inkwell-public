import React, { useState } from "react";
import { formatDistance, format } from "date-fns";
import { Badge } from "@manuscript/lib";

interface IDateCyclerProps {
  createdAt: string;
  updatedAt?: string;
}

enum IDateCyclerStage {
  Created = "Created",
  Updated = "Updated",
  Relative = "Relative",
}

const stages = [
  IDateCyclerStage.Created,
  IDateCyclerStage.Updated,
  IDateCyclerStage.Relative,
];

const DateCycler = (props: IDateCyclerProps) => {
  const { createdAt, updatedAt } = props;
  const [currentStage, setCurrentStage] = useState<IDateCyclerStage>(
    IDateCyclerStage.Created
  );

  const onClick = () => {
    setCurrentStage((prev) => {
      const currentIndex = stages.indexOf(prev);
      const nextIndex = currentIndex + 1;
      if (nextIndex >= stages.length) {
        return stages[0];
      }
      return stages[nextIndex];
    });
  };

  if (currentStage === IDateCyclerStage.Created) {
    return (
      <Badge onClick={onClick}>
        Created: {format(new Date(createdAt), "MM/dd/yyyy")}
      </Badge>
    );
  }

  if (currentStage === IDateCyclerStage.Updated) {
    return (
      <Badge onClick={onClick}>
        Updated:{" "}
        {updatedAt
          ? format(new Date(updatedAt), "MM/dd/yyyy")
          : format(new Date(createdAt), "MM/dd/yyyy")}
      </Badge>
    );
  }

  if (currentStage === IDateCyclerStage.Relative) {
    return (
      <Badge onClick={onClick}>
        {formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
      </Badge>
    );
  }

  return <></>;
};

export default DateCycler;
