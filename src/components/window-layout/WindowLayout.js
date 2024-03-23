import React, { useState } from "react";

// utils
import cn from "classnames";

// hooks
import { useResizable } from "react-resizable-layout";

// context
import WindowLayoutContext from "../../context/windowLayoutContext";

// components
import SampleSplitter from "../sample-splitter/SampleSplitter";
import VerticalTab from "../verticle-tab/VerticalTab";
import UserForm from "../user-form/UserForm";

// styles
import styles from "./window-layout.module.css";

const WindowLayout = () => {
  const [activeTabId, setActiveTabId] = useState(0);

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
    initial: 400,
    min: 50,
    reverse: true,
  });

  // data contains object with property index and title
  const data = [
    {
      index: 0,
      title: "Insert User",
    },
    {
      index: 1,
      title: "Update User",
    },
    {
      index: 2,
      title: "Insert/Update Count",
    },
  ];

  return (
    <div className={styles.windowLayoutContainer}>
      <WindowLayoutContext.Provider value={{ activeTabId, setActiveTabId }}>
        <div className={styles.topContainer}>
          {fileW > 130 && (
            <div
              className={cn(styles.contents, styles.fileContent)}
              style={{ width: fileW }}
            >
              <VerticalTab data={data} />
            </div>
          )}
          <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
          <div className={styles.topContainer}>
            <div className={styles.contents} style={{ width: "100%" }}>
              {activeTabId === 2 ? <p>No form to show!</p> : <UserForm />}
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
      </WindowLayoutContext.Provider>
    </div>
  );
};

export default WindowLayout;
