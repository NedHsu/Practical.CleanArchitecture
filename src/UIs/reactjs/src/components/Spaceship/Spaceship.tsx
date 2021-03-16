import React from "react";

import styles from "./Spaceship.module.scss";

const Spaceship = props => {
  const width = (props.rating * 75) / 5;
  return (
    <div className={styles.space}>
      <div className={styles.sun}></div>
      <div className={styles.earth}>
        <div className={styles.moon}></div>
        <div className={styles.moon}></div>
      </div>
      <div className={styles.ship}>
        <body>
          <div className={styles.windows}></div>
          <div className={styles.wings}>
            <div className={styles.wing1}></div>
            <div className={styles.wing2}></div>
            <div className={styles.wing3}></div>
          </div>
        </body>
        <div className={styles.power}></div>
      </div>
    </div>
  );
};

export default Spaceship;
