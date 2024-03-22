import React from "react";

// utils
import cn from "classnames";

// hooks
import { useResizable } from "react-resizable-layout";

// styles
import styles from "./window-layout.module.css";
import SampleSplitter from "../sample-splitter/SampleSplitter";

const WindowLayout = () => {
  const fileBarMaxWidth = window.innerWidth * 0.8;

  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps,
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 0,
    max: fileBarMaxWidth,
  });

  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true,
  });

  return (
    <div className={styles.windowLayoutContainer}>
      <div className={styles.topContainer}>
        {fileW > 50 && (
          <div className={cn(styles.contents)} style={{ width: fileW }}>
            File Tree
          </div>
        )}
        <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={styles.topContainer}>
          <div className={styles.contents} style={{ width: "100%" }}>
            Editor
          </div>
        </div>
      </div>
      <SampleSplitter
        dir={"horizontal"}
        isDragging={isTerminalDragging}
        {...terminalDragBarProps}
      />
      <div className={styles.contents} style={{ height: terminalH }}>
        Terminal
      </div>
    </div>
  );
};

export default WindowLayout;
