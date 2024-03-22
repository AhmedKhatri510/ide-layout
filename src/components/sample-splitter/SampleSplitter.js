import React, { useState } from "react";
import styles from "./sample-splitter.module.css";
import cn from "classnames";

const SampleSplitter = ({ id = "drag-bar", dir, isDragging, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={cn(
        styles["sample-drag-bar"],
        { [styles["sample-drag-bar--horizontal"]]: dir === "horizontal" },
        { [styles["sample-drag-bar--dragging"]]: isDragging || isHovered }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    />
  );
};

export default SampleSplitter;
