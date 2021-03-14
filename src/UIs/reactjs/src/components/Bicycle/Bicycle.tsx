import React from "react";

import styles from "./Bicycle.module.scss";

const Bicycle = props => {
  return (
    <div className={styles.container}>
      <div className={styles.seat_container}>
        <div className={styles.seat}></div>
      </div>
      <div className={styles.frame_container}>
        <div className={styles.frame_1}></div>
        <div className={styles.frame_2}></div>
        <div className={styles.frame_3}></div>
        <div className={styles.frame_4}></div>
      </div>
      <div className={styles.frame_container_2}>
        <div className={styles.frame_1}></div>
      </div>
      <div className={styles.frame_container_front + " " + styles.frame_container}>
        <div className={styles.frame_0}></div>
        <div className={styles.frame_1}></div>
        <div className={styles.frame_2}></div>
        <div className={styles.frame_3}></div>
        <div className={styles.front_wheel}>
          <div className={styles.spikes_container}>
            <div className={styles.spike_1}></div>
            <div className={styles.spike_2}></div>
          </div>
          <div className={styles.inner_wheel}></div>
        </div>
      </div>
      <div className={styles.frame_container_back}>
        <div className={styles.frame_1}></div>
        <div className={styles.frame_2}></div>
        <div className={styles.front_wheel + " " + styles.back_wheel}>
          <div className={styles.spikes_container}>
            <div className={styles.spike_1}></div>
            <div className={styles.spike_2}></div>
          </div>
          <div className={styles.inner_wheel}></div>
        </div>
        <div className={styles.paddel_container}>
          <div className={styles.paddel}>
            <div className={styles.p_l}></div>
            <div className={styles.p_r}></div>
          </div>
          <div className={styles.chain}></div>
        </div>
      </div>
    </div>
  );
};

export default Bicycle;
