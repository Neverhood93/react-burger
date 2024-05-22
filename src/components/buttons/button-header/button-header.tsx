import styles from "./button-header.module.css";
import React, { PropsWithChildren } from "react";

const ButtonHeader: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <button className={styles.button_header}>{children}</button>;
};

export default ButtonHeader;
