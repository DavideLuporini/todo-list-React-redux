import React from "react";
import { Todo } from "../../features/Todo/Todo";

const Badge = ({
  text,
  tag,
  color,
}: {
  text: string;
  tag: string;
  color: "string";
}) => {
  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className={`badge ${tag || ""}`}
    >
      {text || ""}
    </div>
  );
};

export default Badge;
