import { format, formatDistance } from "date-fns";
import { atom, useAtom } from "jotai";
import React from "react";

interface IDateCyclerProps {
  createdAt: string;
  updatedAt: string;
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

const dateCyclerAtom = atom<IDateCyclerStage>(IDateCyclerStage.Created);

const DateCycler = (props: IDateCyclerProps) => {
  const { createdAt, updatedAt } = props;
  const [currentStage, setCurrentStage] = useAtom(dateCyclerAtom);

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
      <div onClick={onClick}>
        Created: {format(new Date(createdAt), "MM/dd/yyyy")}
      </div>
    );
  }

  if (currentStage === IDateCyclerStage.Updated) {
    return (
      <div onClick={onClick}>
        Updated: {format(new Date(updatedAt), "MM/dd/yyyy")}
      </div>
    );
  }

  if (currentStage === IDateCyclerStage.Relative) {
    return (
      <div onClick={onClick}>
        {formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
      </div>
    );
  }

  return <></>;
};

export default DateCycler;
