import React, { useContext } from "react";

import styles from "./vtlist.module.css";
import WindowLayoutContext from "../../context/windowLayoutContext";

const VTlist = ({ data, onClick, index }) => {
  const { activeTabId } = useContext(WindowLayoutContext);
  const Clicked = () => {
    onClick(index);
  };

  return (
    <li key={index} style={{ listStyle: "none", textAlign: "left" }}>
      <button
        className={styles["section__Jobs-buttonCompany"]}
        onClick={Clicked}
        style={
          activeTabId === index ? { color: "#64ffda" } : { color: "#8892b0" }
        }
      >
        {data.title}
      </button>
    </li>
  );
};

export default VTlist;
