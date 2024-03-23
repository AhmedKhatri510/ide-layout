import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import VTlist from "./VTList";

import styles from "./verticle-tab.module.css";

const VerticalTab = ({ data }) => {
  const [activeTabId, setActiveTabId] = useState(0);

  const btnClick = (id) => {
    setActiveTabId(id);
  };

  return (
    <Container className={styles["section__Jobs-container"]}>
      <Row>
        <Col sm="3">
          <div className={styles["section__Jobs-styledTab"]}>
            <ul className={styles["section__Jobs-styledTabList"]}>
              {data.map((tab) => (
                <VTlist
                  key={tab.index}
                  onClick={btnClick}
                  data={tab}
                  index={tab.index}
                  activeTabId={activeTabId}
                />
              ))}
            </ul>
          </div>
        </Col>
      </Row>
      <span
        className={
          activeTabId === 0
            ? styles["index1-chosen"]
            : activeTabId === 1
            ? styles["index2-chosen"]
            : styles["index3-chosen"]
        }
      >
        &nbsp;
      </span>
    </Container>
  );
};

export default VerticalTab;
